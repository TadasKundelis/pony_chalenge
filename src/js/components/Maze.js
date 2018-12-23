import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cell from './Cell';

const Maze = (props) => {
  const {
    displayMaze, maze, width, height, mazeHelper
  } = props;
    //calculate css width and height based on maze width and height
  const [CSSwidth, CSSheight] = [width, height].map(param => `${param * 25 + 3}px`);
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
  return (
    <React.Fragment>
      <div className="mazeContainer">
        {maze && displayMaze
          ? (
            <div style={styles} className="maze">
              { cells }
            </div>
          ) : null}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  displayMaze: state.UI.displayMaze,
  maze: state.maze.maze,
  mazeHelper: state.maze.mazeHelper,
  width: state.maze.width,
  height: state.maze.height
});

Maze.propTypes = {
  displayMaze: PropTypes.bool.isRequired,
  maze: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

Maze.defaultProps = {
  maze: null
};

export default connect(mapStateToProps, null)(Maze);
