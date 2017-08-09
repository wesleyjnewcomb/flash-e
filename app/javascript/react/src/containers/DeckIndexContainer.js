import React, { Component } from 'react'

import DeckTile from '../components/DeckTile'
import DeckFormContainer from './DeckFormContainer'
import fetchJsonAndCallback from '../fetchJsonAndCallback'
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

    fetchJsonAndCallback(this.props.fetchPath, { }, (response) => {
      this.setState({ decks: response.decks })
    })
  }

  render() {
    let deckTiles = this.state.decks.map(deck => {
      return <DeckTile deck={deck} currentUser={this.state.currentUser} key={deck.id} />
    })
    let form
    if (this.state.currentUser.id && this.props.showForm) {
      form = (
        <div className='row panel radius'>
          <DeckFormContainer />
        </div>
      )
    }
    return (
      <div className='deck-index-container'>
        {form}
        <h2 className='text-center'>{this.props.title}</h2>
        {deckTiles}
      </div>
    )
  }
}

DeckIndexContainer.defaultProps = {
  title: 'Browse',
  fetchPath: '/api/v1/decks',
  showForm: true
}

export default DeckIndexContainer
