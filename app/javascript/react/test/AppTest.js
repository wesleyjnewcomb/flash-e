import App from '../src/App';
import React from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

describe('A test for App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />)
  })

  it('should pass', () => {
    expect(true).toEqual(true)
  })
})
