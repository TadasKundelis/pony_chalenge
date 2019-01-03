import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cell from './Cell';
import { playGame } from '../actions';
import Result from './Result';
import Spinner from './Spinner';
import MazeHelper from '../utilities/MazeHelper';

export const Maze = (props) => {
  const {
    mazeUI, playBtnUI, matrix, width, height, mazeHelper, playGame
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
        <Cell {...data} key={index} />
      );
    });
  }
  return (
    <div className="mazeContainer">
      <div className="upperContainer">
        <div style={styles} className={`maze${mazeUI === 'display' ? ' fadeIn' : ' fadeOut'}`}>
          {cells}
        </div>
        <Spinner />
      </div>
      <div className="bottomContainer">
        <button className={`playBtn${playBtnUI === 'display' ? ' fadeIn' : ' fadeOut'}`} type="button" onClick={playGame}>Play!</button>
        <Result />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  mazeUI: state.UI.maze,
  playBtnUI: state.UI.playBtn,
  matrix: state.maze.matrix,
  mazeHelper: state.maze.mazeHelper,
  width: state.maze.width,
  height: state.maze.height
});

const mapDispatchToProps = dispatch => ({
  playGame: () => dispatch(playGame())
});

Maze.propTypes = {
  mazeUI: PropTypes.string.isRequired,
  playBtnUI: PropTypes.string.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mazeHelper: PropTypes.shape(MazeHelper),
  playGame: PropTypes.func.isRequired
};

Maze.defaultProps = {
  matrix: null,
  mazeHelper: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);
