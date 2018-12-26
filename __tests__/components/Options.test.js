import React from 'react';
import { shallow } from 'enzyme';
import { Options } from '../../src/js/components/Options';
import { Select } from '../../src/js/components/Select';

describe('<Options />', () => {
  const mockFetchMazeID = jest.fn();
  const mockSetProp = jest.fn();
  const data = {
    width: 15,
    height: 15,
    display: true,
    difficulty: 5,
    fetchMazeID: mockFetchMazeID,
    setProp: mockSetProp
  };

  const wrapper = shallow(<Options {...data} />);
  it('should contain 3 Select components', () => {
    expect(wrapper.find(Select)).toHaveLength(3);
  });
  it('should call fetchMazeID function on button click', () => {
    wrapper.find('button').simulate('click');
    expect(mockFetchMazeID.mock.calls.length).toBe(1);
  });
});
