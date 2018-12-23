import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Options from './Options';
import Result from './Result';
import { play } from '../thunks';

const Footer = (props) => {
  const { displayPlayBtn, play } = props;
  return (
    <footer>
      <Options />
      <Result />
      {displayPlayBtn
        ? <button type="button" onClick={play}>Play!</button> : null}
    </footer>
  );
};

const mapStateToProps = state => ({
  displayPlayBtn: state.UI.displayPlayBtn
});

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(play())
});

Footer.propTypes = {
  play: PropTypes.func.isRequired,
  displayPlayBtn: PropTypes.bool.isRequired

};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
