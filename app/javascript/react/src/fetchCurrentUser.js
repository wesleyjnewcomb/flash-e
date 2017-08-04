function fetchCurrentUser() {
  fetch('/api/v1/users/current', {
    credentials: 'same-origin'
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
  .then(response => {
    this.setState({ currentUser: response.user })
  })
}

export default fetchCurrentUser
