import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Spinner = (props) => {
  const { spinnerUI } = props;
  return spinnerUI === 'display'
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
  spinnerUI: state.UI.spinner
});

Spinner.propTypes = {
  spinnerUI: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(Spinner);
