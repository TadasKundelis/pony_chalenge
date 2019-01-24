import React from 'react';
import { shallow } from 'enzyme';
import Cell from '../../src/js/components/Cell';

describe('<Cell />', () => {
  const data = {
    col: 5,
    row: 5,
    walls: ['north'],
    occupiedBy: 'domokun'
  };
  const wrapper = shallow(<Cell {...data} />);
  it('should render a letter if "occupiedBy" prop is provided', () => {
    expect(wrapper.text()).toEqual('D');
  });
  it('should have a CSS class "cell"', () => {
    expect(wrapper.find('.cell')).toHaveLength(1);
  });
  it('should have CSS class cell--domokun if it is occupied by domokun', () => {
    expect(wrapper.find('.cell--domokun')).toHaveLength(1);
  });
  it('should have CSS class "cell--northWall" if the prop walls includes "north"', () => {
    expect(wrapper.find('.cell--northWall')).toHaveLength(1);
  });
  it('should not have CSS class "cell-westWall" if the prop walls does not include "west"', () => {
    expect(wrapper.find('.cell--westWall')).toHaveLength(0);
  });
});
