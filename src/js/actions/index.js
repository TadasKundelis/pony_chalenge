
import * as mazeActions from './maze';
import * as UI from './UI';
import { fetchMazeID, fetchMazeData, sendPonyMove } from '../utilities/APIhelper';

export const createGame = () => async (dispatch, getState) => {
  dispatch(UI.update('loading'));

  const {
    maze: {
      width,
      height,
      difficulty
    }
  } = getState();

  const {
    data: {
      maze_id: mazeID
    }
  } = await fetchMazeID(width, height, difficulty);

  dispatch(mazeActions.setProp('id', mazeID));

  const {
    data: {
      data: cellData,
      pony: ponyPos,
      domokun: domokunPos,
      'end-point': endPoint
    }
  } = await fetchMazeData(mazeID);

  dispatch(mazeActions.createMazeHelper(cellData, [ponyPos, domokunPos, endPoint]));
  dispatch(mazeActions.buildMaze());
  dispatch(UI.update('loaded'));
};

export const playGame = () => async (dispatch, getState) => {
  dispatch(mazeActions.findPonyPath());
  dispatch(UI.update('playing'));

  const {
    maze: {
      id: mazeID,
      ponyPath
    }
  } = getState();

  const moveFigures = async (index = 0) => {
    if (index === ponyPath.length) return;
    const move = ponyPath[index];

    try {
      await sendPonyMove(mazeID, move);
      //  get updated maze with new domokun position
      const {
        data: {
          pony: ponyPos,
          domokun: domokunPos,
          'game-state': {
            state: gameState
          }
        }
      } = await fetchMazeData(mazeID);

      dispatch(mazeActions.updatePositions(ponyPos, domokunPos));

      if (gameState === 'won' || gameState === 'over') {
        const result = gameState === 'won' ? 'You won! Congratulations!' : 'You lost...';
        dispatch(mazeActions.setProp('result', result));
        dispatch(UI.update('gameOver'));
        return;
      }
    } catch (err) {
      console.log(err);
    }
    moveFigures(index + 1);
  };
  moveFigures();
};

export const resetState = () => (dispatch) => {
  dispatch(UI.update());
  setTimeout(() => dispatch(mazeActions.resetMaze()), 300);
};
