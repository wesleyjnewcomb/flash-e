import React, { Component } from 'react'
import update from 'react-addons-update';

import EditCardTile from '../components/EditCardTile'
import TextField from '../components/TextField'

export default class DeckBuilder extends Component {
  constructor(props) {
    super(props)
    // sample data for now
    this.state = {
      name: 'HTTP Response Codes',
      description: 'Deck description',
      cards: [
        { id: 1, side1: '200', side2: 'OK' },
        { id: 2, side1: '403', side2: 'Forbidden' },
        { id: 3, side1: '404', side2: 'Not Found' },
        { id: 4, side1: '500', side2: 'Internal server error' }
      ],
      deletedCards: [],
      nextNewId: -1
    }
    this.handleChange = this.handleChange.bind(this)
    this.addCard = this.addCard.bind(this)
    this.editCard = this.editCard.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
    this.saveDeck = this.saveDeck.bind(this)
  }

  componentDidMount() {
    // fetch('/api/v1/decks/1')
    // .then(response => {
    //   if(response.ok) {
    //     return response.json()
    //   }
    // })
    // .then(response => {
    //   this.setState(response.deck)
    // })
  }

  preparePayload() {
    let cards = this.state.cards.filter(card => card.id > 0)
    let newCards = this.state.cards.filter(card => card.id < 0)
    let deletedCards = this.state.deletedCards.filter(card => card.id > 0)

    let payload = {
      deck: {
        name: this.state.name,
        description: this.state.description,
        cards: cards,
        newCards: newCards,
        deleteCard: deletedCards
      }
    }

    return payload
  }

  saveDeck() {
    let payload = this.preparePayload()
    //////////
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
    let cardTiles = this.state.cards.map((card, i) => {
      return (
        <EditCardTile key={card.id}
          index={i}
          cardData={card}
          onChange={this.editCard}
          onDelete={this.deleteCard}
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
        <div className='text-center'>
          <button className='button tiny success round' onClick={this.addCard}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }
}
