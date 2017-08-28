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
  let onChange = jasmine.createSpy('onChange')
  let onDelete = jasmine.createSpy('onDelete')
  let moveUp = jasmine.createSpy('moveUp')
  let moveDown = jasmine.createSpy('moveDown')
  beforeEach(() => {
    wrapper = mount(
      <EditCardTile
        cardData={cardData}
        onChange={onChange}
        onDelete={onDelete}
        moveUp={moveUp}
        moveDown={moveDown}
      />
    )
  })

  it('should render the EditCardTile component', () => {
    expect(wrapper.find(EditCardTile)).toBePresent();
  })
  it('should render two TextField elements', () => {
    expect(wrapper.find(TextField).length).toEqual(2);
  })
  it('should pass the correct props to each TextField', () => {
    expect(wrapper.find(TextField).first().props()).toEqual({
      placeholder: 'Side 1',
      name: `card-${cardData.id} side1`,
      value: cardData.side1,
      onChange: jasmine.any(Function)
    })
  })
  it('should render reorder arrows', () => {
    expect(wrapper.find(".fa-chevron-up")).toBePresent();
    expect(wrapper.find(".fa-chevron-down")).toBePresent();
  })
  it('should call moveUp when clicking the up arrow', () => {
    wrapper.find('.fa-chevron-up').simulate('click')
    expect(moveUp).toHaveBeenCalled()
  })
  it('should call moveDown when clicking the down arrow', () => {
    wrapper.find('.fa-chevron-down').simulate('click')
    expect(moveDown).toHaveBeenCalled()
  })
  it('should render a delete button', () => {
    expect(wrapper.find(".fa-trash-o")).toBePresent();
  })
  it('should call onDelete when the delete button is clicked', () => {
    wrapper.find(".fa-trash-o").simulate('click')
    expect(onDelete).toHaveBeenCalled()
  })
})
