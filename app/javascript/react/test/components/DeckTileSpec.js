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
    user: {
      id: 1,
      name: 'Wesley Newcomb'
    },
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
    expect(wrapper).toIncludeText(name)
  })
  it('should not render a CardSection', () => {
    expect(wrapper.find(CardSection)).toBePresent()
  })
  it('should pass the correct props to CardSection', () => {
    expect(wrapper.find(CardSection).props()).toEqual({
      cards: deckData.cards,
      hidden: true
    })
  })
  it('should show the CardSection when clicked', () => {
    wrapper.find('h2').simulate('click')
    expect(wrapper.find(CardSection).prop('hidden')).toEqual(false)
  })
  it('should not render anything if the deck has been deleted', () => {
    wrapper.setState({ deleted: true })
    expect(wrapper.find('.deck-tile')).not.toBePresent()
  })
})
