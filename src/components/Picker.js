/**
 * Created by Chris Dorward on 16/01/2017
 * components/Picker
 */
import React, { PropTypes } from 'react';

const Picker = ({ value, onChange, options }) => (
  <span>
    <h3>{value}</h3>
    <select onChange={e => onChange(e.target.value)}
      value={value}>
      {options.map(option =>
        <option value={option} key={option}>
          {option}
        </option>)
      }
    </select>
  </span>
);

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Picker;
