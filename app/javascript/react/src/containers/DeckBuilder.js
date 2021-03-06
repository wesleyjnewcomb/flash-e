import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import update from 'react-addons-update';
import swal from 'sweetalert'

import EditCardTile from '../components/EditCardTile'
import TextField from '../components/TextField'
import fetchJsonAndCallback from '../fetchJsonAndCallback'
import immutableSwap from '../immutableSwap'

export default class DeckBuilder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      cards: [],
      deletedCards: [],
      nextNewId: -1,
      redirect: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.addCard = this.addCard.bind(this)
    this.editCard = this.editCard.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
    this.swapCards = this.swapCards.bind(this)
    this.saveDeck = this.saveDeck.bind(this)
  }

  componentDidMount() {
    fetchJsonAndCallback(`/api/v1/decks/${this.props.match.params.id}`, { },
      response => {
        let { name, description, cards } = response.deck
        this.setState({
          name: name,
          description: description,
          cards: cards
        })
      }
    )
  }

  validateDeck() {
    for(let card of this.state.cards) {
      if (card.side1.trim() === '' || card.side2.trim() === '') {
        swal('Save Error','Could not save: one or more card sides are blank.','error')
        return false
      }
    }
    if (this.state.name.trim() === '') {
      swal('Save Error','Could not save: deck name is blank.','error')
      return false
    }
    return true
  }

  preparePayload() {
    let positionedCards = this.state.cards.map((card, index) => {
      return Object.assign({ position: index }, card)
    })
    let cards = positionedCards.filter(card => card.id > 0)
    let newCards = positionedCards.filter(card => card.id < 0)
    let deletedCards = this.state.deletedCards.filter(card => card.id > 0)
    let deletedCardIds = deletedCards.map(card => card.id)

    let payload = {
      deck: {
        name: this.state.name,
        description: this.state.description,
        cards: cards,
        newCards: newCards,
        deletedCards: deletedCardIds
      }
    }
    return payload
  }

  saveDeck() {
    if (!this.validateDeck()) {
      return
    }
    let payload = this.preparePayload()
    fetchJsonAndCallback(`/api/v1/decks/${this.props.match.params.id}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      body: JSON.stringify(payload)
    }, response => {
      let { name, description, cards } = response.deck
      this.setState({
        name: name,
        description: description,
        cards: cards,
        deletedCards: [],
        nextNewId: -1
      })
      swal({
        title: "Deck Saved!",
        text: "Your deck has been saved!\n\
        Would you like to practice this deck?",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#AC0057",
        confirmButtonText: "Go to Practice",
        cancelButtonText: "Stay Here",
      },
      (isConfirm) => {
        if (isConfirm) {
          this.setState({ redirect: `/decks/${response.deck.id}/practice` })
        }
      })
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  addCard(e) {
    e.preventDefault()
    let id = this.state.nextNewId
    let cardData = { id: id, side1: '', side2: '' }
    let newCards = update(this.state.cards, { $push: [cardData] })
    this.setState({
      cards: newCards,
      nextNewId: id-1
    })
  }

  editCard(id, key, value) {
    let index = this.state.cards.findIndex(card => card.id === id)
    let updatedCards = update(this.state.cards,
      { [index]: { $merge: { [key]: value } } }
    )

    this.setState({ cards: updatedCards })
  }

  swapCards(index1, index2) {
    let newCards = immutableSwap(this.state.cards, index1, index2)
    this.setState({ cards: newCards })
  }

  deleteCard(id) {
    let removedCard = this.state.cards.filter(card => card.id === id)
    let newCards = this.state.cards.filter(card => card.id !== id)
    let newDeletedCards = update(this.state.deletedCards,
      { $push: removedCard }
    )
    this.setState({
      cards: newCards,
      deletedCards: newDeletedCards
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    let cardTiles = this.state.cards.map((card, i) => {
      let moveUp, moveDown
      if (i > 0) {
        moveUp = () => this.swapCards(i, i - 1)
      }
      if (i < this.state.cards.length - 1) {
        moveDown = () => this.swapCards(i, i + 1)
      }
      return (
        <EditCardTile key={card.id}
          cardData={card}
          onChange={this.editCard}
          onDelete={this.deleteCard}
          moveUp={moveUp}
          moveDown={moveDown}
        />
      )
    })
    return (
      <div>
        <h1 className='text-center'>Deck Builder</h1>
        <div className='row'>
          <div className='panel small-10 small-centered columns'>
            <TextField
              label='Deck Name'
              placeholder='Deck Name'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <br/>
        {cardTiles}
        <br/>
        <div className='row'>
          <div className='small-6 columns'>
            <button className='button tiny success round' onClick={this.addCard}>
              <i className="fa fa-plus" aria-hidden="true"></i> Add Card
            </button>
          </div>
          <div className='small-6 columns text-right'>
            <button className='button small radius' onClick={this.saveDeck}>
              <i className="fa fa-save" aria-hidden="true"></i> Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}
