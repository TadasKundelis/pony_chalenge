import React from 'react';
import PropTypes from 'prop-types';

export class Select extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {
      target: {
        value
      }
    } = e;
    const { setProp } = this.props;
    console.log(value);
    setProp(Number(value));
  }

  render() {
    const {
      label, range
    } = this.props;
    const [start, end] = range;
    const options = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    return (
      <React.Fragment>
        <label htmlFor="dropdown">
          {label}
        </label>
        <select id="dropdown" onChange={this.handleChange}>
          {options.map(option => <option key={option}>{option}</option>)}
        </select>
      </React.Fragment>
    );
  }
}

Select.propTypes = {
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  label: PropTypes.string.isRequired,
  setProp: PropTypes.func.isRequired
};


export default Select;
