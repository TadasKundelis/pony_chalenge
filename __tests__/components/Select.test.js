import React from 'react';
import { shallow } from 'enzyme';
import { Select } from '../../src/js/components/Select';

describe('<Select />', () => {
  const mockSetProp = jest.fn();
  const data = {
    range: [1, 10],
    label: 'Width',
    setProp: mockSetProp
  };
  const wrapper = shallow(<Select {...data} />);
  it('should contain options equal to range length', () => {
    const { range: [start, end] } = data;
    const length = end - start + 1;
    expect(wrapper.find('option')).toHaveLength(length);
  });
  it('should display the label', () => {
    const { label } = data;
    expect(wrapper.find('label').text()).toBe(label);
  });
  it('should call setProp function on change', () => {
    wrapper.find('select').simulate('change', { target: { value: 11 } });
    expect(mockSetProp.mock.calls.length).toBe(1);
  });
});
