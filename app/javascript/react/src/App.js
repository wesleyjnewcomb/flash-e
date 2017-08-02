import React from 'react';

import DeckBuilder from './containers/DeckBuilder'

const App = props => {
  let match = { params: { id: 3 } }
  return(
    <DeckBuilder match={match}/>
  )
}

export default App
