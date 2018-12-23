import React from 'react';
import { shallow } from 'enzyme';
import { Result } from '../../src/js/components/Result';

describe('<Result />', () => {
  it('should render result prop text', () => {
    const data = {
      display: true,
      result: 'won'
    };
    const wrapper = shallow(<Result {...data} />);
    expect(wrapper.find('.result').text()).toBe('won');
  });
  it('should render null if display = false', () => {
    const data = {
      display: false,
      result: 'won'
    };
    const wrapper = shallow(<Result {...data} />);
    expect(wrapper.type()).toEqual(null);
  });
});
