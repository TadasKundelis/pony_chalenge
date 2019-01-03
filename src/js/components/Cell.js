import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ walls, occupiedBy }) => {
  const CSSclasses = ['cell'];
  // get first letter for Pony, Domokun or Endpoint
  const name = (occupiedBy || '').slice(0, 1).toUpperCase();
  // give different css class(different color) for each letter
  if (occupiedBy) CSSclasses.push(`cell--${occupiedBy}`);
  // add css classes if cell has walls
  if (walls.includes('north')) CSSclasses.push('cell--northWall');
  if (walls.includes('west')) CSSclasses.push('cell--westWall');
  return (
    <div className={CSSclasses.join(' ')}>
      {name}
    </div>
  );
};

Cell.propTypes = {
  walls: PropTypes.arrayOf(PropTypes.string).isRequired,
  occupiedBy: PropTypes.string
};

Cell.defaultProps = {
  occupiedBy: null
};

export default Cell;
