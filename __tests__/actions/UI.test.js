import * as actions from '../../src/js/actions/UI';
import * as actionTypes from '../../src/js/constants/actionTypes';

describe('UI actions', () => {
  describe('Update', () => {
    const [el, value] = ['playBtn', 'display'];
    const expectedAction = {
      type: actionTypes.UPDATE_UI,
      el,
      value
    };
    it('should create an action to update UI element', () => {
      expect(actions.updateDisplay(el, value)).toEqual(expectedAction);
    });
    describe('resetUI action creator', () => {
      const expectedAction = {
        type: actionTypes.RESET_UI
      };
      it('should create an action to reset UI settings', () => {
        expect(actions.reset()).toEqual(expectedAction);
      });
    });
  });
});
