import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

import CardSection from './CardSection'
import fetchJsonAndCallback from '../fetchJsonAndCallback'

class DeckTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingCards: false,
      deleted: false
    }

    this.toggleShowCards = this.toggleShowCards.bind(this)
    this.deleteDeck = this.deleteDeck.bind(this)
  }
  toggleShowCards() {
    let showingCards = !this.state.showingCards
    this.setState({ showingCards: showingCards })
  }

  deleteDeck() {
    swal({
     title: "Are you sure?",
     text: "Are you sure you want to permanently delete this deck?",
     type: "warning",
     showCancelButton: true,
     confirmButtonColor: "#DD6B55",
     confirmButtonText: "Yes, delete it!",
     closeOnConfirm: false
   }, () => {
     let deckPath = `/api/v1/decks/${this.props.deck.id}`
     fetchJsonAndCallback(deckPath, {
       method: 'DELETE',
       credentials: 'same-origin'
     }, response => {
       this.setState({ deleted: true })
       swal('Deck deleted!')
     })
   })
  }

  render() {
    if (this.state.deleted) return <div/>
    let currentUser = this.props.currentUser
    let deck = this.props.deck
    let cards = deck.cards
    let caretClass, caret

    if (this.state.showingCards) {
      caretClass = "fa fa-chevron-circle-down"
    } else {
      caretClass = "fa fa-chevron-circle-right"
    }
    caret = <i className={caretClass} aria-hidden="true"></i>

    let deleteButton, editButton
    if (currentUser && currentUser.id === deck.user.id) {
      deleteButton = (
        <button
          className="button radius alert tiny"
          onClick={this.deleteDeck}
        >
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      )
      editButton = (
        <Link to={`/decks/${deck.id}/edit`} className="button radius tiny">
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </Link>
      )
    }
    return (
      <div className='deck-tile row'>
        <div className='right'>
          {deleteButton}&nbsp;{editButton}&nbsp;
          <Link to={`/decks/${deck.id}/practice`}
          className="button success radius tiny"
          >
            <i className="fa fa-play" aria-hidden="true"></i>
          </Link>
        </div>
        <h2 onClick={this.toggleShowCards}>
          <div className='left'>
            {caret}&nbsp;
          </div>
          {deck.name}
        </h2>
        <div className='left creator'>
          created by <Link to={`/users/${deck.user.id}`}>{deck.user.name}</Link>
        </div>
        <CardSection cards={cards} hidden={!this.state.showingCards}/>
      </div>
      )
  }
}

export default DeckTile
