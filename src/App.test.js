import React from 'react';
import App from './App';

import { mount } from 'enzyme'
import { when } from 'q';

describe('Evercraft', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<App />)
  })

  describe('when player is created', () => {
    beforeEach(() => {
      wrapper.find('#new-character-name-player').simulate('change', { target: { value: 'stranger' } })
      wrapper.find('#button-create-character-player').simulate('click')
    })

    it('displays the character with the provided name', () => {
      expect(wrapper.find('#character-name-player').text()).toBe('stranger')
    })

    it('displays armor default value', () => {
      expect(wrapper.find('#character-armor-player').text()).toBe('Armor Class: 10')
    })

    it('displays hp default value', () => {
      expect(wrapper.find('#character-hp-player').text()).toBe('Hit Points: 5')
    })

    it('does not create character without name', () => {
      wrapper = mount(<App />)
      wrapper.find('#new-character-name-player').simulate('change', { target: { value: '' } })
      wrapper.find('#button-create-character-player').simulate('click')
  
      expect(wrapper.find('#character-name-player').length).toBe(0)
    })
  })

  describe('when starting the game', () => {
    beforeEach(() => {
      wrapper.find('#new-character-name-player').simulate('change', { target: { value: 'stranger' } })
      wrapper.find('#button-create-character-player').simulate('click')

      wrapper.find('#new-character-name-player').simulate('change', { target: { value: 'danger' } })
      wrapper.find('#button-create-character-player').simulate('click')

      wrapper.find('#start-game-button').simulate('click')

    })

    it ('can select attacker', () => {
      let selector = wrapper.find('select-player-attacker')
      selector.simulate('change', {target: { value : 'stranger'}});

      expect(wrapper.find("character-name-attacker")).toBe('stranger')
    })

    it ('can select defender', () => {
      let selector = wrapper.find('select-player-defender')
      selector.simulate('change', {target: { value : 'danger'}});

      expect(wrapper.find("character-name-attacker")).toBe('danger')
    })
  })
});
