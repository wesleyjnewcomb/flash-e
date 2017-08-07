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
      practiceSet: [],
      flipped: false,
      currentCard: 0,
    }
    this.flipCard = this.flipCard.bind(this)
    this.restart = this.restart.bind(this)
    this.previousCard = this.previousCard.bind(this)
    this.nextCard = this.nextCard.bind(this)
    this.parseKeyPress = this.parseKeyPress.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.parseKeyPress)
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
        cards: cards,
        practiceSet: cards
      })
    })
  }

  flipCard() {
    this.setState((prevState, props) => {
      return {
        flipped: !prevState.flipped
      }
    })
  }

  restart() {
    this.setState({
      flipped: false,
      currentCard: 0
    })
  }

  previousCard() {
    if(this.state.currentCard === 0) {
      return
    }
    this.setState((prevState, props) => {
      return {
        flipped: false,
        currentCard: prevState.currentCard - 1
      }
    })
  }

  nextCard() {
    if (this.state.currentCard >= this.state.cards.length - 1) {
      this.restart()
      return
    }
    this.setState((prevState, props) => {
      return {
        flipped: false,
        currentCard: prevState.currentCard + 1
      }
    })
  }

  parseKeyPress(e) {
    const shortcuts = {
      32: this.flipCard,
      37: this.previousCard,
      39: this.nextCard
    }

    if (e.keyCode in shortcuts) {
      shortcuts[e.keyCode]()
    }
  }

  render() {
    if (!this.state.cards.length) {
      return <div />
    }
    let leftButton, rightButton
    if (this.state.currentCard > 0) {
      leftButton = (
        <li>
          <button onClick={this.previousCard} className='tiny button'>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
        </li>
      )
    } else {
      leftButton = (
        <li>
          <button className='secondary disabled tiny button'>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
        </li>
      )
    }

    if (this.state.currentCard < this.state.cards.length - 1) {
      rightButton = (
        <li>
          <button onClick={this.nextCard} className='tiny button'>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </li>
      )
    } else {
      rightButton = (
        <li>
          <button onClick={this.restart} className='tiny button'>
            <i className="fa fa-reply-all" aria-hidden="true"></i>
          </button>
        </li>
      )
    }
    let card = this.state.cards[this.state.currentCard]
    return (
      <div className='deck-practice'>
        <h2 className='text-center'>Practice</h2>
        <PracticeCard
          card={card}
          flipped={this.state.flipped}
          onClick={this.flipCard}
        />
        <div className='row'>
          <div className='small-8 medium-5 large-3 small-centered columns'>
            <ul className='button-group round even-3'>
              {leftButton}
              <li>
                <button onClick='' className='tiny button'>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </li>
              {rightButton}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
