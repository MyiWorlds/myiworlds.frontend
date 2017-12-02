import React from 'react';
import PropTypes from 'prop-types';
import MUIButton from 'material-ui/Button';

const Button = props => {
  return (
    <MUIButton
      raised={props.raised}
      color={props.color}
      onClick={props.onClick}
    >
      {props.children}
    </MUIButton>
  );
};

Button.prototype.propTypes = {
  stepperLegend: PropTypes.array,
  children: PropTypes.node,
};

export default Button;
