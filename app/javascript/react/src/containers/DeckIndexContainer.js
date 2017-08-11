import React, { Component } from 'react'

import DeckTile from '../components/DeckTile'
import TextField from '../components/TextField'
import DeckFormContainer from './DeckFormContainer'
import fetchJsonAndCallback from '../fetchJsonAndCallback'
import fetchCurrentUser from '../fetchCurrentUser'

class DeckIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      currentUser: {},
      filter: ''
    }
    this.fetchCurrentUser = fetchCurrentUser.bind(this)
    this.filterDecks = this.filterDecks.bind(this)
  }
  componentDidMount() {
    this.fetchCurrentUser()

    fetchJsonAndCallback(this.props.fetchPath, { }, (response) => {
      this.setState({ decks: response.decks })
    })
  }

  filterDecks(e) {
    this.setState({ filter: e.target.value.trim().toLowerCase() })
  }

  render() {
    let decks = this.state.decks
    if (this.state.filter.trim() !== '') {
      decks = decks.filter(deck => {
        return deck.name.toLowerCase().includes(this.state.filter)
      })
    }
    let deckTiles = decks.map(deck => {
      return <DeckTile deck={deck} currentUser={this.state.currentUser} key={deck.id} />
    })
    let form, filter
    if (this.state.currentUser.id && this.props.showForm) {
      form = (
        <div className='row panel radius'>
          <DeckFormContainer />
        </div>
      )
    }

    if (this.props.showFilter) {
      filter = (
        <div className='row'>
          <TextField
            placeholder='Filter Results'
            name='filter'
            value={this.state.filter}
            onChange={this.filterDecks}
          />
        </div>
      )
    }

    return (
      <div className='deck-index-container'>
        {form}
        <h2 className='text-center'>{this.props.title}</h2>
        {filter}
        {deckTiles}
      </div>
    )
  }
}

DeckIndexContainer.defaultProps = {
  title: 'Browse',
  fetchPath: '/api/v1/decks',
  showForm: true,
  showFilter: true
}

export default DeckIndexContainer
