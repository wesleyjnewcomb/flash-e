import React, { Component } from 'react'

import DeckTile from '../components/DeckTile'
import fetchCurrentUser from '../fetchCurrentUser'

class DeckIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      currentUser: {}
    }
    this.fetchCurrentUser = fetchCurrentUser.bind(this)
  }
  componentDidMount() {
    this.fetchCurrentUser()

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
      return <DeckTile deck={deck} currentUser={this.state.currentUser} key={deck.id} />
    })
    return (
      <div className='deck-index-container'>
        <h1 className='text-center'>Browse</h1>
        {deckTiles}
      </div>
    )
  }
}

export default DeckIndexContainer
