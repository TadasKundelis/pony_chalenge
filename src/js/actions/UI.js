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
        ['options', 'hide'],
        ['spinner', 'display']
      ].forEach(updateElement);
      break;
    case 'loaded':
      [
        ['maze', 'display'],
        ['spinner', 'hide'],
        ['playBtn', 'display']
      ].forEach(updateElement);
      break;
    case 'playing':
      updateElement(['playBtn', 'hide']);
      break;
    case 'gameOver':
      updateElement(['result', 'display']);
      break;
    default:
      dispatch(reset());
      break;
  }
};
