import React from 'react';
import { shallow } from 'enzyme';
import { Result } from '../../src/js/components/Result';

describe('<Result />', () => {
  const mockResetState = jest.fn();
  const data = {
    resultUI: 'display',
    result: 'won',
    resetState: mockResetState
  };
  const wrapper = shallow(<Result {...data} />);
  it('should render result prop text', () => {
    expect(wrapper.find('.result').text()).toBe('won');
  });
  it('should have fadeOut class if resultUI is equal to "hide"', () => {
    data.resultUI = 'hide';
    const wrapper = shallow(<Result {...data} />);
    expect(wrapper.find('.fadeOut')).toHaveLength(1);
  });
  it('should call startNewGame function when "new game" button is clicked', () => {
    wrapper.find('button').simulate('click');
    expect(mockResetState.mock.calls.length).toBe(1);
  });
});
