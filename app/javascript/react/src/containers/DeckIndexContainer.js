import React, { Component } from 'react'

import DeckTile from '../components/DeckTile'

class DeckIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: []
    }
  }
  componentDidMount() {
    fetch('/api/v1/decks')
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(response => {
      this.setState({ decks: response.decks })
    })
  }

  render() {
    let deckTiles = this.state.decks.map(deck => {
      return <DeckTile deck={deck} key={deck.id} />
    })
    return (
      <div className='deck-index-container'>
        {deckTiles}
      </div>
    )
  }
}

export default DeckIndexContainer
