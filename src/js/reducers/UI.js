import * as actionTypes from '../constants/actionTypes';

export const initialState = {
  maze: 'hide',
  options: 'display',
  result: 'hide',
  playBtn: 'hide',
  spinner: 'hide'
};

export const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_UI:
      return initialState;
    case actionTypes.UPDATE_UI:
      return { ...state, [action.el]: action.value };
    default:
      return state;
  }
};

export default UIReducer;
