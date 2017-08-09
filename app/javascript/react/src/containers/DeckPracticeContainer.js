import React, { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert'

import PracticeCard from '../components/PracticeCard'
import fetchJsonAndCallback from '../fetchJsonAndCallback'

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
      redirect: null
    }
    this.rightArrow = this.rightArrow.bind(this)

    this.flipCard = this.flipCard.bind(this)
    this.restart = this.restart.bind(this)
    this.previousCard = this.previousCard.bind(this)
    this.nextCard = this.nextCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.parseKeyPress = this.parseKeyPress.bind(this)

    this.leaveAlert = this.leaveAlert.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.parseKeyPress)

    fetchJsonAndCallback(`/api/v1/decks/${this.props.match.params.id}`, { },
      response => {
        let { name, description, cards } = response.deck
        this.setState({
          name: name,
          description: description,
          cards: cards,
          practiceSet: cards
        })
      }
    )
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.parseKeyPress)
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

  reset() {
    this.setState({
      practiceSet: this.state.cards,
      flipped: false,
      currentCard: 0
    })
  }

  previousCard() {
    if(this.state.currentCard > 0) {
      this.setState((prevState, props) => {
        return {
          flipped: false,
          currentCard: prevState.currentCard - 1
        }
      })
    }
  }

  rightArrow() {
    if (!this.state.flipped) {
      this.flipCard()
    } else {
      if (this.state.currentCard >= this.state.practiceSet.length - 1) {
        this.finishedAlert()
      } else {
        this.nextCard()
      }
    }
  }

  nextCard() {
    if (this.state.currentCard >= this.state.practiceSet.length - 1) {
      this.finishedAlert()
    } else {
      this.setState((prevState, props) => {
        return {
          flipped: false,
          currentCard: prevState.currentCard + 1
        }
      })
    }
  }

  removeCard() {
    let newPracticeSet = this.state.practiceSet.filter((card, i) => {
      return i !== this.state.currentCard
    })
    this.setState({ practiceSet: newPracticeSet })
    swal({
      title: 'Removed from practice set',
      timer: 1200,
      showConfirmButton: false
    })
  }

  parseKeyPress(e) {
    const shortcuts = {
      32: this.flipCard,
      37: this.previousCard,
      39: this.rightArrow
    }

    if (e.keyCode in shortcuts) {
      e.preventDefault()
      shortcuts[e.keyCode]()
    }
  }

  finishedAlert() {
    swal({
      title: "Completed Practice Set!",
      text: "Congratulations! You completed your practice set!\n\
      Would you like to practice more or go to another part of the site?",
      type: "success",
      showCancelButton: true,
      confirmButtonColor: "#AC0057",
      confirmButtonText: "Practice More",
      cancelButtonText: "Leave",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    (isConfirm) => {
      if (isConfirm) {
        this.stayAlert()
      } else {
        this.leaveAlert()
      }
    });
  }

  stayAlert() {
    swal({
      title: "Practice More",
      text: "Would you like to keep your practice set \
      or reset it and add all the cards back in?",
      showCancelButton: true,
      confirmButtonColor: "#AC0057",
      confirmButtonText: "Keep Practice Set",
      cancelButtonText: "Reset Practice Set"
    },
    (isConfirm) => {
      if (isConfirm) {
        this.restart()
      } else {
        this.reset()
      }
    });
  }

  leaveAlert() {
    swal({
      title: "Where would you like to go?",
      showCancelButton: true,
      confirmButtonColor: "#AC0057",
      confirmButtonText: "Go to Quiz",
      cancelButtonText: "Back to Browse"
    },
    (isConfirm) => {
      if (isConfirm) {
        this.setState({ redirect: '/decks/' })
      } else {
        this.setState({ redirect: '/decks/' })
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    if (!this.state.practiceSet.length) {
      return <div />
    }
    let leftButton, rightButton
    if (this.state.currentCard > 0) {
      leftButton = (
        <li>
          <button onClick={this.previousCard}
            className='small button'
            title='Previous card'
          >
            Previous<br/><i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
        </li>
      )
    } else {
      leftButton = (
        <li>
          <button className='secondary disabled small button'>
            Previous<br/><i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
        </li>
      )
    }
    let rightButtonIcon = this.state.flipped ? 'fa-arrow-right' : 'fa-repeat'
    if (this.state.flipped) {
      rightButton = (
        <li>
          <button onClick={this.rightArrow}
            className='small button'
            title='Next card'
          >
            Next<br/><i className="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </li>
      )
    } else {
      rightButton = (
        <li>
          <button onClick={this.rightArrow}
            className='small button'
            title='Flip'
          >
            Flip<br/><i className="fa fa-repeat" aria-hidden="true"></i>
          </button>
        </li>
      )
    }
    let card = this.state.practiceSet[this.state.currentCard]
    return (
      <div className='deck-practice'>
        <h2 className='text-center'>Practice</h2>
        <h3 className='text-center'>{this.state.name}</h3>
        <PracticeCard
          card={card}
          flipped={this.state.flipped}
          onClick={this.flipCard}
        />
        <div className='row'>
          <div className='small-8 medium-6 large-4 small-centered columns'>
            <ul className='button-group round even-3'>
              {leftButton}
              <li>
                <button onClick={this.removeCard}
                  className='small button'
                  title='Remove from practice set'
                >
                  Remove<br/><i className="fa fa-eject" aria-hidden="true"></i>
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
