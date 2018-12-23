import * as actionTypes from '../constants/actionTypes';

export const buildMaze = () => ({
  type: actionTypes.BUILD_MAZE
});

export const resetMaze = () => ({
  type: actionTypes.RESET_MAZE
});

export const setProp = (prop, value) => ({
  type: actionTypes.SET_PROP,
  prop,
  value
});

export const updatePositions = (ponyPos, domokunPos) => ({
  type: actionTypes.UPDATE_POSITIONS,
  ponyPos,
  domokunPos
});

export const findPonyPath = () => ({
  type: actionTypes.FIND_PONY_PATH
});

export const createMazeHelper = (cellData, positions) => ({
  type: actionTypes.CREATE_MAZE_HELPER,
  cellData,
  positions
});
