import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetState } from '../actions';

// add export here to export unconnected component for testing
export const Result = (props) => {
  const { resultUI, result, resetState } = props;
  return (
    <div className={`resultContainer${resultUI === 'display' ? ' fadeIn' : ' fadeOut'}`}>
      <div className="result">{result}</div>
      <button type="button" onClick={resetState}>New game</button>
    </div>
  );
};

const mapStateToProps = state => ({
  resultUI: state.UI.result,
  result: state.maze.result
});

const mapDispatchToProps = dispatch => ({
  resetState: () => dispatch(resetState())
});

Result.propTypes = {
  resultUI: PropTypes.string.isRequired,
  result: PropTypes.string,
  resetState: PropTypes.func.isRequired
};

Result.defaultProps = {
  result: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
