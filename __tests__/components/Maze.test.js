import React from 'react';
import { shallow } from 'enzyme';
import { Maze } from '../../src/js/components/Maze';
import Cell from '../../src/js/components/Cell';
import createInstance from '../../mock data/MazeHelper';

describe('Maze component', () => {
  const cells = Array.from({ length: 15 },
    _ => Array.from({ length: 15 },
      _ => ({ row: 0, col: 0, walls: [] })));

  const data = {
    playBtnUI: 'display',
    matrix: cells,
    mazeHelper: createInstance(),
    width: 15,
    height: 15,
    mazeUI: 'display'
  };
  const wrapper = shallow(<Maze {...data} />);
  it('should contain number of cells equal to width * height', () => {
    expect(wrapper.find(Cell)).toHaveLength(225);
  }); it('should have a mazeContainer CSS class', () => {
    expect(wrapper.find('.mazeContainer')).toHaveLength(1);
  }); it('should have a maze CSS class', () => {
    expect(wrapper.find('.maze')).toHaveLength(1);
  });
});
