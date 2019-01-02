import axios from 'axios';
import {
  createMazeHelper,
  buildMaze,
  setProp,
  updatePositions,
  findPonyPath,
  resetMaze
} from '../actions/maze';
import {
  updateMazeUI,
  updateOptionsUI,
  updateResultUI,
  updatePlayBtnUI,
  resetUI
} from '../actions/UI';

const baseUrl = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';

export const fetchMazeID = () => (dispatch, getState) => {
  const {
    maze: {
      width,
      height,
      difficulty
    }
  } = getState();
  const config = {
    'maze-width': width,
    'maze-height': height,
    'maze-player-name': 'Rainbow dash',
    difficulty
  };
  return axios
    .post(baseUrl, config)
    .then((res) => {
      const {
        data: {
          maze_id: id
        }
      } = res;
      //get maze data using ID
      dispatch(setProp('id', id));
      dispatch(fetchMaze(id));
    })
    .catch(err => console.log(err));
};

export const fetchMaze = mazeID => dispatch => axios
  .get(`${baseUrl}/${mazeID}`)
  .then((res) => {
    const {
      data: {
        data: cellData,
        pony: ponyPos,
        domokun: domokunPos,
        'end-point': endPoint
      }
    } = res;
    dispatch(createMazeHelper(cellData, [ponyPos, domokunPos, endPoint]));
    dispatch(buildMaze());
    dispatch(updateMazeUI(true));
    dispatch(updatePlayBtnUI(true));
    dispatch(updateOptionsUI(false));
  })
  .catch(err => console.log(err));


export const play = () => (dispatch, getState) => {
  const {
    maze: {
      id,
      ponyPath
    }
  } = getState();

  const moveFigures = async (index = 0) => {
    if (index === ponyPath.length) return;
    const direction = ponyPath[index];

    //send a post request with pony position
    try {
      await axios.post(`${baseUrl}/${id}`, {
        direction
      });
    } catch (err) {
      console.log(err);
    }

    //send a request to get new domokun position
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      const {
        data: {
          pony: ponyPos,
          domokun: domokunPos,
          'game-state': {
            state: gameState
          }
        }
      } = response;

      dispatch(updatePositions(ponyPos, domokunPos));

      if (gameState === 'won' || gameState === 'over') {
        const result = gameState === 'won' ? 'You won! Congratulations!' : 'You lost...';
        dispatch(setProp('result', result));
        dispatch(updateResultUI(true));
        return;
      }
    } catch (err) {
      console.log(err);
    }
    moveFigures(index + 1);
  };
  moveFigures();
};

export const startGame = () => (dispatch) => {
  dispatch(updatePlayBtnUI(false));
  dispatch(findPonyPath());
  dispatch(play());
};

export const resetState = () => (dispatch) => {
  dispatch(resetUI());
  dispatch(resetMaze());
};