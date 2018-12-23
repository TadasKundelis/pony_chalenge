import * as actionTypes from '../../src/js/constants/actionTypes';
import * as actions from '../../src/js/actions/maze';

describe('maze actions', () => {
  describe('buildMaze action creator', () => {
    const expectedAction = {
      type: actionTypes.BUILD_MAZE
    };
    it('should create an action to build a maze', () => {
      expect(actions.buildMaze()).toEqual(expectedAction);
    });
  });
  describe('resetMaze action creator', () => {
    const expectedAction = {
      type: actionTypes.RESET_MAZE
    };
    it('should create an action to reset maze settings', () => {
      expect(actions.resetMaze()).toEqual(expectedAction);
    });
  });
  describe('setProp action creator', () => {
    const prop = 'width';
    const value = 14;
    const expectedAction = {
      type: actionTypes.SET_PROP,
      prop,
      value
    };
    it('should create an action to set a property in maze state', () => {
      expect(actions.setProp(prop, value)).toEqual(expectedAction);
    });
  });
  describe('updatePositions action creator', () => {
    const [ponyPos, domokunPos] = [[14], [60]];
    const expectedAction = {
      type: actionTypes.UPDATE_POSITIONS,
      ponyPos,
      domokunPos
    };
    it('should create an action to update pony and domokun positions in the maze', () => {
      expect(actions.updatePositions(ponyPos, domokunPos)).toEqual(expectedAction);
    });
  });
  describe('finyPonyPath action creator', () => {
    const expectedAction = {
      type: actionTypes.FIND_PONY_PATH
    };
    it('should create an action to update pony and domokun positions in the maze', () => {
      expect(actions.findPonyPath()).toEqual(expectedAction);
    });
  });
});
