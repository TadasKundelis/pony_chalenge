import * as actionTypes from '../../src/js/constants/actionTypes';
import { UIReducer, initialState } from '../../src/js/reducers/UI';

describe('UI reducer', () => {
  it('should return initial state', () => {
    expect(UIReducer(undefined, {})).toEqual(initialState);
  });
  it('should reset UI', () => {
    const action = {
      type: actionTypes.RESET_UI
    };
    const modifiedState = { ...initialState, displayMaze: true };
    expect(UIReducer(modifiedState, action)).toEqual(initialState);
  });
  it('should update maze UI', () => {
    const action = {
      type: actionTypes.UPDATE_MAZE_UI,
      value: true
    };
    const expectedState = { ...initialState, displayMaze: true };
    expect(UIReducer(initialState, action)).toEqual(expectedState);
  });
  it('should update options UI', () => {
    const action = {
      type: actionTypes.UPDATE_OPTIONS_UI,
      value: true
    };
    const expectedState = { ...initialState, displayOptions: true };
    expect(UIReducer(initialState, action)).toEqual(expectedState);
  });
  it('should update result UI', () => {
    const action = {
      type: actionTypes.UPDATE_RESULT_UI,
      value: true
    };
    const expectedState = { ...initialState, displayResult: true };
    expect(UIReducer(initialState, action)).toEqual(expectedState);
  });
  it('should update play button UI', () => {
    const action = {
      type: actionTypes.UPDATE_PLAYBTN_UI,
      value: true
    };
    const expectedState = { ...initialState, displayPlayBtn: true };
    expect(UIReducer(initialState, action)).toEqual(expectedState);
  });
});
