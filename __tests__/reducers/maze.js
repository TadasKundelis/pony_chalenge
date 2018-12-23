import createInstance from '../../mock data/MazeHelper';
import data from '../../mock data/mazeData';
import directions from '../../mock data/directions';
import * as actionTypes from '../../src/js/constants/actionTypes';
import reducer, { initialState } from '../../src/js/reducers/maze';

const mazeHelper = createInstance();

describe('maze reducer', () => {
  it('should return initial state', () => {
    const expectedState = initialState;
    expect(reducer(undefined, {})).toEqual(expectedState);
  });
  it('should reset state', () => {
    const expectedState = initialState;
    const action = {
      type: actionTypes.RESET_MAZE
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  it('should set maze state property', () => {
    const expectedState = { ...initialState, width: 12 };
    const action = {
      type: actionTypes.SET_PROP,
      prop: 'width',
      value: 12
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  it('should create maze helper', () => {
    const { data: cellData } = data;
    const expectedState = { ...initialState, mazeHelper };
    const action = {
      type: actionTypes.CREATE_MAZE_HELPER,
      cellData,
      positions: [[65], [218], [164]]
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should build a maze', () => {
    const maze = mazeHelper.build();
    const state = { ...initialState, mazeHelper };
    const expectedState = { ...initialState, maze, mazeHelper };
    const action = {
      type: actionTypes.BUILD_MAZE
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });
  it('should find pony path in the maze', () => {
    const maze = mazeHelper.build();
    const state = { ...initialState, maze, mazeHelper };
    const expectedState = { ...state, ponyPath: directions };
    const action = {
      type: actionTypes.FIND_PONY_PATH
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });
  it('should update pony and domokun positions in the maze', () => {
    const maze = mazeHelper.build();
    const state = { ...initialState, maze, mazeHelper };
    mazeHelper.updateMaze([66], [219]);
    const expectedState = { ...state, maze };
    const action = {
      type: actionTypes.UPDATE_POSITIONS,
      ponyPos: [66],
      domokunPos: [219]
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });
});
