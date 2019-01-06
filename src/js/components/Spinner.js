import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Spinner = (props) => {
  const { displaySetting } = props;
  return displaySetting === 'displayed'
    ? (
      <div className="maze__spinner">
        <div />
        <div />
        <div />
        <div />
      </div>
    )
    : null;
};

const mapStateToProps = state => ({
  displaySetting: state.UI.spinner
});

Spinner.propTypes = {
  displaySetting: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(Spinner);
