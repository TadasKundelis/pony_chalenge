import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cell from './Cell';
import { play } from '../thunks';
import Result from './Result';
import MazeHelper from '../utilities/MazeHelper';

export const Maze = (props) => {
  const {
    displayMaze, displayPlayBtn, maze, width, height, mazeHelper, play
  } = props;
    //calculate css width and height based on maze width and height
  const [CSSwidth, CSSheight] = [width, height].map(param => `${param * 25 + 2}px`);
  const styles = {
    width: CSSwidth,
    height: CSSheight
  };
  let cells;
  if (maze) {
    cells = Array.from({ length: width * height }, (_, index) => {
      const [row, col] = mazeHelper.calculateCoordinates([index]);
      const data = maze[row][col];
      return (
        <Cell {...data} key={index} />
      );
    });
  }
  return maze && displayMaze
    ? (
      <div className="mazeContainer">
        <div className="upperContainer">
          <div style={styles} className="maze">
            { cells }
          </div>
        </div>
        <div className="bottomContainer">
          {displayPlayBtn
            ? <button type="button" onClick={play}>Play!</button> : null}
          <Result />
        </div>
      </div>
    ) : null;
};

const mapStateToProps = state => ({
  displayMaze: state.UI.displayMaze,
  displayPlayBtn: state.UI.displayPlayBtn,
  maze: state.maze.maze,
  mazeHelper: state.maze.mazeHelper,
  width: state.maze.width,
  height: state.maze.height,
  play: PropTypes.func.isRequired
});

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(play())
});

Maze.propTypes = {
  displayMaze: PropTypes.bool.isRequired,
  displayPlayBtn: PropTypes.bool.isRequired,
  maze: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  play: PropTypes.func.isRequired,
  mazeHelper: PropTypes.shape(MazeHelper)
};

Maze.defaultProps = {
  maze: null,
  mazeHelper: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);
