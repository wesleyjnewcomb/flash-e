function fetchJsonAndCallback(path, init = {}, callback) {
  fetch(path, init)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      let errorMessage = `${response.status} (${response.statusText})`
      let error = new Error(errorMessage);
      throw(error);
    }
  })
  .then(response => {
    callback(response)
  })
  .catch(error => console.error(`Error in fetch chain: ${error.message}`))
}

export default fetchJsonAndCallback
