import React, { Component } from 'react'

import DeckIndexContainer from './DeckIndexContainer'
import fetchJsonAndCallback from '../fetchJsonAndCallback'

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      fetched: false
    }
  }

  componentDidMount() {
    fetchJsonAndCallback(`/api/v1/users/${this.props.match.params.id}`, { },
      response => this.setState({ user: response.user, fetched: true })
    )
  }

  render() {
    if (!this.state.fetched) {
      return <div></div>
    }
    let user = this.state.user
    let deckIndexFetchPath = `/api/v1/users/${user.id}/decks`
    return (
      <div className='user-show-container'>
        <h1 className='text-center'>User Profile</h1>
        <div className='row'>
          <div className='small-12 large-6 columns'>
            <div className='panel'>
              <img src={user.image} />
              <h4 className='text-center'>{user.name}</h4>
              <p className='text-right'><i>({user.email})</i></p>
            </div>
          </div>
          <div className='small-12 large-6 columns'>
            <DeckIndexContainer
              title={`${this.state.user.name}'s Decks`}
              fetchPath={deckIndexFetchPath}
              showForm={false}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default UserShowContainer
