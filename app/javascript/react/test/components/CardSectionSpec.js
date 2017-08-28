import React from 'react'
import { shallow } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'

import CardSection from '../../src/components/CardSection'

describe('CardSection', () => {
  let wrapper
  let cardsData = [
    { id: 1, side1: 'card 1 side 1', side2: 'card 1 side 2'},
    { id: 2, side1: 'card 2 side 1', side2: 'card 2 side 2'}
  ]

  beforeEach(() => {
    wrapper = shallow(<CardSection cards={cardsData} hidden={false} />)
  })

  it('should not render with the "hidden" class when hidden is false', () => {
    expect(wrapper.find('.hidden')).not.toBePresent()
  })
  it('should render with the "hidden" class when hidden is true', () => {
    let hiddenCards = shallow(<CardSection cards={cardsData} hidden={true} />)
    expect(hiddenCards.find('.hidden')).toBePresent()
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
