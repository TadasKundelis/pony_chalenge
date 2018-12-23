import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProp } from '../actions/maze';
import { fetchMazeID } from '../thunks';

import Select from './Select';

const Options = (props) => {
  const {
    display, width, height, difficulty, setProp, fetchMazeID
  } = props;

  return display ? (
    <div className="optionsContainer">
      <button type="button" onClick={fetchMazeID}>Create maze!</button>
      <div className="labelContainer">
        <Select value={width} label="Width" setProp={value => setProp('width', value)} />
        <Select value={height} label="Height" setProp={value => setProp('height', value)} />
        <Select value={difficulty} label="Difficulty" setProp={value => setProp('difficulty', value)} />
      </div>
    </div>
  )
    : null;
};

const mapStateToProps = state => ({
  display: state.UI.displayOptions,
  width: state.maze.width,
  height: state.maze.height,
  difficulty: state.maze.difficulty
});

const mapDispatchToProps = dispatch => ({
  fetchMazeID: () => dispatch(fetchMazeID()),
  setProp: (prop, value) => dispatch(setProp(prop, value))
});


Options.propTypes = {
  display: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  fetchMazeID: PropTypes.func.isRequired,
  setProp: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
