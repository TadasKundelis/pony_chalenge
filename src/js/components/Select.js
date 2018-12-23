import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  const { value, setProp, label } = props;
  const min = label === 'Difficulty' ? '1' : '15';
  const max = label === 'Difficulty' ? '10' : '25';
  const handleChange = (e) => {
    const { target: { value } } = e;
    return setProp(Number(value));
  };
  return (
    <label>
      {label}
      <input min={min} max={max} type="number" value={value} onChange={handleChange} />
    </label>
  );
};

Select.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  setProp: PropTypes.func.isRequired
};


export default Select;
