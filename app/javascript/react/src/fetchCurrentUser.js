import fetchJsonAndCallback from './fetchJsonAndCallback'

function fetchCurrentUser() {
  fetchJsonAndCallback('/api/v1/users/current',
  { credentials: 'same-origin' },
  response => {
    this.setState({ currentUser: response.user })
  })
}

export default fetchCurrentUser
