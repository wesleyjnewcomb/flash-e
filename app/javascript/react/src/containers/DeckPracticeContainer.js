import React, { Component } from 'react'
import update from 'react-addons-update';

import PracticeCard from '../components/PracticeCard'

export default class DeckPracticeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      cards: [],
      flipped: false,
      currentCard: 0,
    }
    this.flipCard = this.flipCard.bind(this)
    this.nextCard = this.nextCard.bind(this)
  }

  flipCard() {
    this.setState({ flipped: true })
  }

  previousCard() {
    this.setState((prevState, props) => {
      return {
        flipped: false,
        currentCard: prevState.currentCard - 1
      }
    })
  }

  nextCard() {
    debugger
    this.setState((prevState, props) => {
      return {
        flipped: false,
        currentCard: prevState.currentCard + 1
      }
    })
  }

  componentDidMount() {
    fetch(`/api/v1/decks/${this.props.match.params.id}`)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
    })
    .then(response => {
      let { name, description, cards } = response.deck
      this.setState({
        name: name,
        description: description,
        cards: cards
      })
    })
  }

  render() {
    if (!this.state.cards.length) {
      return <div />
    }
    let card = this.state.cards[this.state.currentCard]
    let clickMethod = this.state.flipped ? this.nextCard : this.flipCard
    return (
      <div className='deck-practice'>
        <h2 className='text-center'>Practice</h2>
        <PracticeCard
          card={card}
          flipped={this.state.flipped}
          onClick={clickMethod}
        />
      </div>
    )
  }
}
