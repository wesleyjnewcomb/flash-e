import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import DeckIndexContainer from './containers/DeckIndexContainer'
import DeckBuilder from './containers/DeckBuilder'

const App = props => {
  return(
    <Router>
      <div className='page-container'>
        <Route exact path='/' component={DeckIndexContainer} />
        <Route exact path='/decks' component={DeckIndexContainer} />
        <Route exact path='/decks/:id/edit' component={DeckBuilder} />
      </div>
    </Router>
  )
}

export default App
