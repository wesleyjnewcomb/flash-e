import React from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import TextField from '../../src/components/TextField';

describe('TextField', () => {
  let wrapper;
  let label = 'Test Label'
  beforeEach(() => {
    wrapper = mount(
      <TextField
        label={label}
        name='test'
        value='test'
      />
    )
  })

  it('should render the TextField component', () => {
    expect(wrapper.find(TextField)).toBePresent();
  })
  it('should render an input element', () => {
    expect(wrapper.find("input")).toBePresent();
  })
  it('should render the label for user to see', () => {
    expect(wrapper.find("label")).toBePresent();
    expect(wrapper.find("label")).toIncludeText(label);
  })
})
