import React from 'react'
import { mount } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'
import createRouterContext from 'react-router-test-context'

import DeckTile from '../../src/components/DeckTile'
import CardSection from '../../src/components/CardSection'

describe('DeckTile', () => {
  let wrapper
  let name = 'Deck Name'
  let description = 'Deck description'
  let deckData = {
    id: 1,
    name: name,
    description: description,
    cards: [
      { id: 1, side1: 'card 1 side 1', side2: 'card 1 side 2'},
      { id: 2, side1: 'card 2 side 1', side2: 'card 2 side 2'}
    ]
  }
  DeckTile.contextTypes = {
    router: React.PropTypes.object
  }
  beforeEach(() => {
    const context = createRouterContext()
    wrapper = mount(<DeckTile deck={deckData} />, { context })
  })

  it('should render the DeckTile component', () => {
    expect(wrapper.find(DeckTile)).toBePresent()
  })
  it('should renders the name as an h2', () => {
    expect(wrapper.find('h2')).toIncludeText(name)
  })
  it('should not render the cards at first', () => {
    expect(wrapper.find(CardSection)).not.toBePresent()
  })
  it('should render the cards if showingCards is true in state', () => {
    wrapper.setState({ showingCards: true })
    expect(wrapper.find(CardSection)).toBePresent()
  })
  it('should pass the correct props to CardSection', () => {
    wrapper.setState({ showingCards: true })
    expect(wrapper.find(CardSection).props()).toEqual({ cards: deckData.cards })
  })
})
