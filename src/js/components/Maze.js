import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cell from './Cell';
import { startGame } from '../thunks';
import Result from './Result';
import MazeHelper from '../utilities/MazeHelper';

export const Maze = (props) => {
  const {
    displayMaze, displayPlayBtn, matrix, width, height, mazeHelper, startGame
  } = props;
    //calculate css width and height based on maze width and height
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
        <Cell {...data} key={index} />
      );
    });
  }
  return matrix && displayMaze
    ? (
      <div className="mazeContainer">
        <div className="upperContainer">
          <div style={styles} className="maze">
            { cells }
          </div>
        </div>
        <div className="bottomContainer">
          {displayPlayBtn
            ? <button type="button" onClick={startGame}>Play!</button> : null}
          <Result />
        </div>
      </div>
    ) : null;
};

const mapStateToProps = state => ({
  displayMaze: state.UI.displayMaze,
  displayPlayBtn: state.UI.displayPlayBtn,
  matrix: state.maze.matrix,
  mazeHelper: state.maze.mazeHelper,
  width: state.maze.width,
  height: state.maze.height
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame())
});

Maze.propTypes = {
  displayMaze: PropTypes.bool.isRequired,
  displayPlayBtn: PropTypes.bool.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mazeHelper: PropTypes.shape(MazeHelper),
  startGame: PropTypes.func.isRequired
};

Maze.defaultProps = {
  matrix: null,
  mazeHelper: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);
