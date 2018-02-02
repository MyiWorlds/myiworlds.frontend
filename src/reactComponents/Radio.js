import MUIRadio from 'material-ui/Radio';
import React from 'react';
import PropTypes from 'prop-types';

const Radio = props => {
  return (
    <MUIRadio
      checked={props.checked}
      onChange={props.handleChange}
      value={props.value}
      name={props.name}
      aria-label={props.name}
    />
  );
};

Radio.prototype.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Radio;
