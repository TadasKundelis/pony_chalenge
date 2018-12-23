import axios from 'axios';
import {
  createMazeHelper, buildMaze, setProp, updatePositions, findPonyPath, resetMaze
} from '../actions/maze';
import {
  updateMazeUI, updateOptionsUI, updateResultUI, updatePlayBtnUI, resetUI
} from '../actions/UI';

const baseUrl = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';

export const fetchMazeID = () => (dispatch, getState) => {
  const {
    maze: {
      width, height, difficulty
    }
  } = getState();
  const config = {
    'maze-width': width,
    'maze-height': height,
    'maze-player-name': 'Rainbow dash',
    difficulty
  };
  axios
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

export const fetchMaze = mazeID => (dispatch) => {
  axios
    .get(`${baseUrl}/${mazeID}`)
    .then((res) => {
      const {
        data: {
          data: cellData, pony: ponyPos, domokun: domokunPos, 'end-point': endPoint
        }
      } = res;
      dispatch(createMazeHelper(cellData, [ponyPos, domokunPos, endPoint]));
      dispatch(buildMaze());
      dispatch(updateMazeUI(true));
      dispatch(updatePlayBtnUI(true));
      dispatch(updateOptionsUI(false));
    })
    .catch(err => console.log(err));
};

export const updateMaze = () => (dispatch, getState) => {
  const {
    maze: {
      id
    }
  } = getState();
  //request to get the new maze state after pony move
  axios
    .get(`${baseUrl}/${id}`)
    .then((res) => {
      const {
        data: {
          pony: ponyPos, domokun: domokunPos,
          'game-state': {
            state: gameState
          }
        }
      } = res;
      //update domokun and pony positions in the maze
      dispatch(updatePositions(ponyPos, domokunPos));
      if (gameState === 'won' || gameState === 'over') {
        const result = gameState === 'won' ? 'You won! Congratulations!' : 'You lost...';
        dispatch(setProp('result', result));
        dispatch(updateResultUI(true));
        return;
      }
      //make another move with the pony
      dispatch(movePony());
    });
};

export const movePony = () => (dispatch, getState) => {
  const {
    maze: {
      id, ponyPath
    }
  } = getState();
  //get next direction from the pony path
  const direction = ponyPath.shift();
  if (!direction) return;
  //send a post request to get a response with new domokun position
  axios
    .post(`${baseUrl}/${id}`, { direction })
    .then((_) => {
      //add some delay for smoother visualisation
      setTimeout(() => dispatch(updateMaze()), 400);
    })
    .catch(err => console.log(err));
};

export const play = () => (dispatch) => {
  dispatch(updatePlayBtnUI(false));
  dispatch(findPonyPath());
  dispatch(movePony());
};

export const resetState = () => (dispatch) => {
  dispatch(resetUI());
  dispatch(resetMaze());
};
