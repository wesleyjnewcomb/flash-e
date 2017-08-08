import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import CardSection from './CardSection'

class DeckTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingCards: false
    }

    this.toggleShowCards = this.toggleShowCards.bind(this)
  }
  toggleShowCards() {
    let showingCards = !this.state.showingCards
    this.setState({ showingCards: showingCards })
  }

  render() {
    let currentUser = this.props.currentUser
    let deck = this.props.deck
    let cards = deck.cards
    let cardSection, caretClass, caret

    if (this.state.showingCards) {
      cardSection = <CardSection cards={cards} />
      caretClass = "fa fa-chevron-circle-down"
    } else {
      caretClass = "fa fa-chevron-circle-right"
    }
    caret = <i className={caretClass} aria-hidden="true"></i>

    let editButton
    if (currentUser && currentUser.id === deck.user.id) {
      editButton = (
        <Link to={`/decks/${deck.id}/edit`} className="button radius tiny">
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </Link>
      )
    }
    return (
      <div className='row deck-tile'>
        <h2 onClick={this.toggleShowCards}>
          <div className='left'>
            {caret}&nbsp;
          </div>
          {deck.name}
          <div className='right'>
            {editButton}
          </div>
        </h2>
        {cardSection}
      </div>
      )
  }
}

export default DeckTile
