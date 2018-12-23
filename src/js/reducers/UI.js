const initialState = {
  displayMaze: false,
  displayOptions: true,
  displayResult: false,
  displayPlayBtn: false
};

const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_UI':
      return initialState;
    case 'UPDATE_MAZE_UI':
      return { ...state, displayMaze: action.value };
    case 'UPDATE_OPTIONS_UI':
      return { ...state, displayOptions: action.value };
    case 'UPDATE_RESULT_UI':
      console.log(action.value);
      return { ...state, displayResult: action.value };
    case 'UPDATE_PLAYBTN_UI':
      return { ...state, displayPlayBtn: action.value };
    default:
      return state;
  }
};

export default UIReducer;
