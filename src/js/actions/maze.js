export const buildMaze = () => ({
  type: 'BUILD_MAZE'
});

export const resetMaze = () => ({
  type: 'RESET_MAZE'
});

export const setProp = (prop, value) => ({
  type: 'SET_PROP',
  prop,
  value
});

export const updatePositions = (ponyPos, domokunPos) => ({
  type: 'UPDATE_POSITIONS',
  ponyPos,
  domokunPos
});

export const findPonyPath = () => ({
  type: 'FIND_PONY_PATH'
});

export const createMazeHelper = (cellData, positions) => ({
  type: 'CREATE_MAZE_HELPER',
  cellData,
  positions
});
