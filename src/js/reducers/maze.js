import MazeHelper from '../utilities/MazeHelper';
import * as actionTypes from '../constants/actionTypes';

export const initialState = {
  matrix: null,
  mazeHelper: null,
  id: null,
  height: 15,
  width: 15,
  difficulty: 1,
  ponyPath: null,
  result: null
};

const mazeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_MAZE: {
      const {
        height, width, difficulty
      } = state;
      //keep current width, height and difficulty settings, reset everything else
      return {
        ...initialState, width, height, difficulty
      };
    }
    case actionTypes.SET_PROP: {
      const { prop, value } = action;
      return { ...state, [prop]: value };
    }
    case actionTypes.CREATE_MAZE_HELPER: {
      const { width, height } = state;
      const {
        positions, cellData
      } = action;
      const mazeHelper = new MazeHelper(cellData, positions, width, height);
      return { ...state, mazeHelper };
    }
    case actionTypes.BUILD_MAZE: {
      const { mazeHelper } = state;
      const matrix = mazeHelper.createMatrix();
      return {
        ...state, matrix
      };
    }
    case actionTypes.FIND_PONY_PATH: {
      const { mazeHelper } = state;
      const ponyPath = mazeHelper.findPath();
      return { ...state, ponyPath };
    }
    case actionTypes.UPDATE_POSITIONS: {
      const { mazeHelper } = state;
      const { ponyPos, domokunPos } = action;
      const matrix = mazeHelper.updateMaze(ponyPos, domokunPos);
      return { ...state, matrix };
    }
    default:
      return state;
  }
};

export default mazeReducer;
