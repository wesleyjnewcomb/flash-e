import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class DeckTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingCards: false
    }

    this.toggleShowCards = this.toggleShowCards.bind(this)
  }
  toggleShowCards() {
    let showingCards = !this.state.showingCards
    this.setState({ showingCards: showingCards })
  }

  render() {
    let deck = this.props.deck
    let cardSection, caretClass, caret
    if (this.state.showingCards) {
      let cardTiles = deck.cards.map(card => {
        return (
          <tr key={card.id} className='card-tile'>
            <td className='small-6 columns side1'>{card.side1}</td>
            <td className='small-6 columns side2'>{card.side2}</td>
          </tr>
        )
      })
      cardSection = (
        <div className='card-section'>
          <table>
            <tr>
              <th className='small-6 columns side1'>Side 1</th>
              <th className='small-6 columns side2'>Side 2</th>
            </tr>
            {cardTiles}
          </table>
        </div>
      )
      caretClass = "fa fa-chevron-circle-down"
    } else {
      caretClass = "fa fa-chevron-circle-right"
    }
    caret = <i className={caretClass} aria-hidden="true"></i>
    return (
      <div className='deck-tile'>
        <h2 onClick={this.toggleShowCards}>
          <div className='left'>
            {caret}&nbsp;
          </div>
          {deck.name}
          <div className='right'>
            <Link to={`/decks/${deck.id}/edit`} className="button radius tiny">
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </Link>
          </div>
        </h2>
        {cardSection}
      </div>
      )
  }
}

export default DeckTile
