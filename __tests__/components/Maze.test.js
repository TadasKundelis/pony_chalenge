import React from 'react';
import { shallow } from 'enzyme';
import { Maze } from '../../src/js/components/Maze';
import Cell from '../../src/js/components/Cell';
import createInstance from '../../mock data/MazeHelper';

describe('Maze component', () => {
  let wrapper;
  let data;
  beforeEach(() => {
    const cells = Array.from({ length: 15 },
      _ => Array.from({ length: 15 },
        _ => ({ row: 0, col: 0, walls: [] })));

    data = {
      matrix: cells,
      mazeHelper: createInstance(),
      width: 15,
      height: 15,
      displaySetting: 'displayed'
    };
    wrapper = shallow(<Maze {...data} />);
  });

  it('should contain number of cells equal to width * height', () => {
    expect(wrapper.find(Cell)).toHaveLength(225);
  });
  it('should have a maze CSS class', () => {
    expect(wrapper.find('.maze')).toHaveLength(1);
  });
  it('should have a "displayed" CSS class if displaySetting = "displayed"', () => {
    expect(wrapper.find('div').hasClass('displayed')).toEqual(true);
  });
  it('should have a "hidden" CSS class if displaySetting = "hidden"', () => {
    data.displaySetting = 'hidden';
    wrapper = shallow(<Maze {...data} />);
    expect(wrapper.find('div').hasClass('hidden')).toEqual(true);
  });
});
