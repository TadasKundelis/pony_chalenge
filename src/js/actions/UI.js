import * as actionTypes from '../constants/actionTypes';

export const updateMazeUI = value => ({
  type: actionTypes.UPDATE_MAZE_UI,
  value
});

export const updateOptionsUI = value => ({
  type: actionTypes.UPDATE_OPTIONS_UI,
  value
});

export const updatePlayBtnUI = value => ({
  type: actionTypes.UPDATE_PLAYBTN_UI,
  value
});

export const updateResultUI = value => ({
  type: actionTypes.UPDATE_RESULT_UI,
  value
});
export const resetUI = () => ({
  type: actionTypes.RESET_UI
});
