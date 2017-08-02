import React from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import EditCardTile from '../../src/components/EditCardTile';
import TextField from '../../src/components/TextField';

describe('TextField', () => {
  let wrapper;
  let cardData = {
    id: 1,
    side1: 'side 1',
    side2: 'side 2'
  }
  beforeEach(() => {
    wrapper = mount(
      <EditCardTile
        cardData={cardData}
      />
    )
  })

  it('should render the EditCardTile component', () => {
    expect(wrapper.find(EditCardTile)).toBePresent();
  })
  it('should render two TextField elements', () => {
    expect(wrapper.find(TextField).length).toEqual(2);
  })
  it('should render reorder arrows', () => {
    expect(wrapper.find(".fa-chevron-up")).toBePresent();
    expect(wrapper.find(".fa-chevron-down")).toBePresent();
  })
  it('should render a delete button', () => {
    expect(wrapper.find(".fa-trash-o")).toBePresent();
  })
})
