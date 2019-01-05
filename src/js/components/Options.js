import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProp } from '../actions/maze';
import { createGame } from '../actions';
import { Select } from './Select';

export const Options = (props) => {
  const {
    optionsUI, width, height, difficulty, setProp, createGame
  } = props;

  return (
    <div className={`options-container${optionsUI === 'display' ? ' fadeIn' : ' fadeOut'}`}>
      <button type="button" onClick={createGame}>Create maze</button>
      <div className="label-container">
        <Select value={width} label="Width" range={[15, 25]} setProp={value => setProp('width', value)} />
        <Select value={height} label="Height" range={[15, 25]} setProp={value => setProp('height', value)} />
        <Select value={difficulty} label="Difficulty" range={[1, 10]} setProp={value => setProp('difficulty', value)} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  optionsUI: state.UI.options,
  width: state.maze.width,
  height: state.maze.height,
  difficulty: state.maze.difficulty
});

const mapDispatchToProps = dispatch => ({
  createGame: () => dispatch(createGame()),
  setProp: (prop, value) => dispatch(setProp(prop, value))
});


Options.propTypes = {
  optionsUI: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  createGame: PropTypes.func.isRequired,
  setProp: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
