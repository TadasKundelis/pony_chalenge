import MazeHelper from '../utilities/MazeHelper';

const initialState = {
  maze: null,
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
    case 'RESET_MAZE':
      return initialState;
    case 'SET_PROP': {
      const { prop, value } = action;
      return { ...state, [prop]: value };
    }
    case 'CREATE_MAZE_HELPER': {
      const { width, height } = state;
      const {
        positions, cellData
      } = action;
      const mazeHelper = new MazeHelper(cellData, positions, width, height);
      return { ...state, mazeHelper };
    }
    case 'BUILD_MAZE': {
      const { mazeHelper } = state;
      const maze = mazeHelper.build();
      return {
        ...state, maze
      };
    }
    case 'FIND_PONY_PATH': {
      const { mazeHelper } = state;
      const ponyPath = mazeHelper.findPath();
      return { ...state, ponyPath };
    }
    case 'UPDATE_POSITIONS': {
      const { mazeHelper } = state;
      const maze = mazeHelper.updateMaze(action.ponyPos, action.domokunPos);
      return { ...state, maze };
    }
    default:
      return state;
  }
};

export default mazeReducer;
