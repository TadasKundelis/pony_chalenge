import MazeHelper from '../src/js/utilities/MazeHelper';
import data from './mazeData';

const createInstance = () => {
  const {
    size: [width, height], data: cellData, pony, domokun, 'end-point': endPoint
  } = data;
  const positions = [pony, domokun, endPoint];
  return new MazeHelper(cellData, positions, width, height);
};

export default createInstance;
