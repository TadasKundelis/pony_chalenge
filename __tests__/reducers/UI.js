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
    const modifiedState = { ...initialState, maze: 'display' };
    expect(UIReducer(modifiedState, action)).toEqual(initialState);
  });
  it('should update maze UI', () => {
    const action = {
      type: actionTypes.UPDATE_UI,
      el: 'maze',
      value: 'hide'
    };
    const expectedState = { ...initialState, maze: 'hide' };
    expect(UIReducer(initialState, action)).toEqual(expectedState);
  });
  it('should update options UI', () => {
    const action = {
      type: actionTypes.UPDATE_UI,
      el: 'options',
      value: 'display'
    };
    const expectedState = { ...initialState, options: 'display' };
    expect(UIReducer(initialState, action)).toEqual(expectedState);
  });
  it('should update result UI', () => {
    const action = {
      type: actionTypes.UPDATE_UI,
      el: 'options',
      value: 'hide'
    };
    const expectedState = { ...initialState, options: 'hide' };
    expect(UIReducer(initialState, action)).toEqual(expectedState);
  });
  it('should update play button UI', () => {
    const action = {
      type: actionTypes.UPDATE_UI,
      el: 'playBtn',
      value: 'display'
    };
    const expectedState = { ...initialState, playBtn: 'display' };
    expect(UIReducer(initialState, action)).toEqual(expectedState);
  });
});
