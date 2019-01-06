import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import Cell from './Cell';
import { playGame } from '../actions';
import MazeHelper from '../utilities/MazeHelper';

export const Maze = (props) => {
  const {
    displaySetting, matrix, width, height, mazeHelper
  } = props;
  // calculate css width and height based on maze width and height
  const [CSSwidth, CSSheight] = [width, height].map(param => `${param * 25 + 2}px`);
  const styles = {
    width: CSSwidth,
    height: CSSheight
  };
  let cells;
  if (matrix) {
    cells = Array.from({ length: width * height }, (_, index) => {
      const [row, col] = mazeHelper.calculateCoordinates([index]);
      const data = matrix[row][col];
      return (
        <Cell {...data} key={uniqid()} />
      );
    });
  }
  return (
    <div style={styles} className={`maze ${displaySetting}`}>
      {cells}
    </div>
  );
};

const mapStateToProps = state => ({
  displaySetting: state.UI.maze,
  matrix: state.maze.matrix,
  mazeHelper: state.maze.mazeHelper,
  width: state.maze.width,
  height: state.maze.height
});

const mapDispatchToProps = dispatch => ({
  playGame: () => dispatch(playGame())
});

Maze.propTypes = {
  displaySetting: PropTypes.string.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mazeHelper: PropTypes.shape(MazeHelper)
};

Maze.defaultProps = {
  matrix: null,
  mazeHelper: null
};


export default connect(mapStateToProps, mapDispatchToProps)(Maze);
