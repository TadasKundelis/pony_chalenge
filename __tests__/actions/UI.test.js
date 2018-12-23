import * as actions from '../../src/js/actions/UI';
import * as actionTypes from '../../src/js/constants/actionTypes';

describe('UI actions', () => {
  describe('updateMazeUI action creator', () => {
    const value = true;
    const expectedAction = {
      type: actionTypes.UPDATE_MAZE_UI,
      value
    };
    it('should create an action to update maze UI', () => {
      expect(actions.updateMazeUI(value)).toEqual(expectedAction);
    });
  });
  describe('updateOptionsUI action creator', () => {
    const value = true;
    const expectedAction = {
      type: actionTypes.UPDATE_OPTIONS_UI,
      value
    };
    it('should create an action to update options UI', () => {
      expect(actions.updateOptionsUI(value)).toEqual(expectedAction);
    });
  });
  describe('updatePlayBtnUI action creator', () => {
    const value = true;
    const expectedAction = {
      type: actionTypes.UPDATE_PLAYBTN_UI,
      value
    };
    it('should create an action to update play button UI', () => {
      expect(actions.updatePlayBtnUI(value)).toEqual(expectedAction);
    });
  });
  describe('updateResultUI action creator', () => {
    const value = true;
    const expectedAction = {
      type: actionTypes.UPDATE_RESULT_UI,
      value
    };
    it('should create an action to update result component UI', () => {
      expect(actions.updateResultUI(value)).toEqual(expectedAction);
    });
  });
  describe('resetUI action creator', () => {
    const expectedAction = {
      type: actionTypes.RESET_UI
    };
    it('should create an action to reset UI settings', () => {
      expect(actions.resetUI()).toEqual(expectedAction);
    });
  });
});


// export const resetUI = () => ({
//   type: actionTypes.RESET_UI
// });
