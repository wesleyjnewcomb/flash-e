import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import TextField from '../components/TextField'
import fetchJsonAndCallback from '../fetchJsonAndCallback'

class DeckFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      newDeckId: null
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    let payload = {
      deck: {
        name: this.state.name,
        description: ''
      }
    }
    if(this.state.name.trim() !== '') {
      fetchJsonAndCallback('/api/v1/decks', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      }, response => {
        this.setState({ newDeckId: response.deck.id })
      })
    }
  }

  render() {
    if (this.state.newDeckId) {
      return <Redirect to={`/decks/${this.state.newDeckId}/edit`} />
    }
    return (
      <form className='deck-form' onSubmit={this.onSubmit}>
        <h3>Add New Deck</h3>
        <div className='row'>
          <div className='small-8 large-10 columns'>
            <TextField
              placeholder='New Deck Name'
              name='name'
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <div className='small-4 large-2 columns'>
            <input type='submit' className='button tiny' />
          </div>
        </div>
      </form>
    )
  }
}

export default DeckFormContainer
