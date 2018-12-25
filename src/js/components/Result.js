import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resetState } from '../thunks';

//add export here to export unconnected component for testing
export const Result = (props) => {
  const { display, result, startNewGame } = props;
  return (
    display ? (
      <div className="resultContainer">
        <div className="result">{result}</div>
        <button type="button" onClick={startNewGame}>New game</button>
      </div>
    ) : null
  );
};

const mapStateToProps = state => ({
  display: state.UI.displayResult,
  result: state.maze.result
});

const mapDispatchToProps = dispatch => ({
  startNewGame: () => dispatch(resetState())
});

Result.propTypes = {
  display: PropTypes.bool.isRequired,
  result: PropTypes.string,
  startNewGame: PropTypes.func.isRequired
};

Result.defaultProps = {
  result: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
