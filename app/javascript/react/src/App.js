import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import DeckIndexContainer from './containers/DeckIndexContainer'
import DeckBuilder from './containers/DeckBuilder'
import DeckPracticeContainer from './containers/DeckPracticeContainer'

const App = props => {
  return(
    <Router>
      <div className='page-container'>
        <Route exact path='/' component={DeckIndexContainer} />
        <Route exact path='/decks' component={DeckIndexContainer} />
        <Route path='/decks/:id/edit' component={DeckBuilder} />
        <Route path='/decks/:id/practice' component={DeckPracticeContainer} />
      </div>
    </Router>
  )
}

export default App
