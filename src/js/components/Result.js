import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetState } from '../actions';

// add export here to export unconnected component for testing
export const Result = (props) => {
  const { displaySetting, result, resetState } = props;
  return (
    <div className={`result ${displaySetting}`}>
      <div className="result__text">{result}</div>
      <button className="result__btn" type="button" onClick={resetState}>New game</button>
    </div>
  );
};

const mapStateToProps = state => ({
  displaySetting: state.UI.result,
  result: state.maze.result
});

const mapDispatchToProps = dispatch => ({
  resetState: () => dispatch(resetState())
});

Result.propTypes = {
  displaySetting: PropTypes.string.isRequired,
  result: PropTypes.string,
  resetState: PropTypes.func.isRequired
};

Result.defaultProps = {
  result: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
