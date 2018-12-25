import * as actionTypes from '../constants/actionTypes';

export const initialState = {
  displayMaze: false,
  displayOptions: true,
  displayResult: false,
  displayPlayBtn: false
};

export const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_UI:
      return initialState;
    case actionTypes.UPDATE_MAZE_UI:
      return { ...state, displayMaze: action.value };
    case actionTypes.UPDATE_OPTIONS_UI:
      return { ...state, displayOptions: action.value };
    case actionTypes.UPDATE_RESULT_UI:
      return { ...state, displayResult: action.value };
    case actionTypes.UPDATE_PLAYBTN_UI:
      return { ...state, displayPlayBtn: action.value };
    default:
      return state;
  }
};

export default UIReducer;
