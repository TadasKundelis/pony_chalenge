import axios from 'axios';

const baseUrl = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';

export const fetchMazeID = (width, height, difficulty) => {
  const config = {
    'maze-width': width,
    'maze-height': height,
    'maze-player-name': 'Rainbow dash',
    difficulty
  };
  return axios.post(baseUrl, config);
};

export const fetchMazeData = mazeID => axios.get(`${baseUrl}/${mazeID}`);

export const sendPonyMove = (mazeID, direction) => axios.post(`${baseUrl}/${mazeID}`, { direction });
