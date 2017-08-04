import React, { Component } from 'react'

import DeckTile from '../components/DeckTile'
import DeckFormContainer from './DeckFormContainer'
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
    let form
    if (this.state.currentUser.id) {
      form = (
        <div className='row panel radius'>
          <DeckFormContainer />
        </div>
      )
    }
    return (
      <div className='deck-index-container'>
        {form}
        <h1 className='text-center'>Browse</h1>
        {deckTiles}
      </div>
    )
  }
}

export default DeckIndexContainer
