import React from 'react'
import { mount } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'

import CardSection from '../../src/components/CardSection'

describe('CardSection', () => {
  let wrapper
  let cardsData = [
    { id: 1, side1: 'card 1 side 1', side2: 'card 1 side 2'},
    { id: 2, side1: 'card 2 side 1', side2: 'card 2 side 2'}
  ]

  beforeEach(() => {
    wrapper = mount(<CardSection cards={cardsData} />)
  })

  it('should render the CardSection component', () => {
    expect(wrapper.find(CardSection)).toBePresent()
  })
  it('should renders a table', () => {
    expect(wrapper.find('table')).toBePresent()
  })
  it('should render the card data', () => {
    expect(wrapper.find('tbody')).toIncludeText('card 1 side 1')
    expect(wrapper.find('tbody')).toIncludeText('card 1 side 2')
    expect(wrapper.find('tbody')).toIncludeText('card 2 side 1')
    expect(wrapper.find('tbody')).toIncludeText('card 2 side 2')
  })
})
