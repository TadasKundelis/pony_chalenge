import React from 'react';
import { shallow } from 'enzyme';
import { Result } from '../../src/js/components/Result';

describe('<Result />', () => {
  const mockStartNewGame = jest.fn();
  const data = {
    display: true,
    result: 'won',
    startNewGame: mockStartNewGame
  };
  const wrapper = shallow(<Result {...data} />);
  it('should render result prop text', () => {
    expect(wrapper.find('.result').text()).toBe('won');
  });
  it('should render null if display = false', () => {
    data.display = false;
    const wrapper = shallow(<Result {...data} />);
    expect(wrapper.type()).toEqual(null);
  });
  it('should call startNewGame function when "new game" button is clicked', () => {
    wrapper.find('button').simulate('click');
    expect(mockStartNewGame.mock.calls.length).toBe(1);
  });
});
