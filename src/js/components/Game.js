import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Maze from './Maze';
import Result from './Result';
import Spinner from './Spinner';
import { playGame } from '../actions';

const Game = (props) => {
  const { displaySetting, playGame } = props;
  return (
    <div className="content-container">
      <div className="upper-container">
        <Maze />
        <Spinner />
      </div>
      <div className="bottom-container">
        <button type="button" className={`play-btn ${displaySetting}`} onClick={playGame}>Play!</button>
        <Result />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  displaySetting: state.UI.playBtn
});

const mapDispatchToProps = dispatch => ({
  playGame: () => dispatch(playGame())
});

Game.propTypes = {
  displaySetting: PropTypes.string.isRequired,
  playGame: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
