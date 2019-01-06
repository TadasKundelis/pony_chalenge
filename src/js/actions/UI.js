import * as actionTypes from '../constants/actionTypes';

export const updateDisplay = (el, value) => ({
  type: actionTypes.UPDATE_UI,
  el,
  value
});

export const reset = () => ({
  type: actionTypes.RESET_UI
});

export const update = state => (dispatch) => {
  const updateElement = ([el, value]) => dispatch(updateDisplay(el, value));
  switch (state) {
    case 'loading':
      [
        ['options', 'hidden'],
        ['spinner', 'displayed']
      ].forEach(updateElement);
      break;
    case 'loaded':
      [
        ['maze', 'displayed'],
        ['spinner', 'hidden'],
        ['playBtn', 'displayed']
      ].forEach(updateElement);
      break;
    case 'playing':
      updateElement(['playBtn', 'hidden']);
      break;
    case 'gameOver':
      updateElement(['result', 'displayed']);
      break;
    default:
      dispatch(reset());
      break;
  }
};
