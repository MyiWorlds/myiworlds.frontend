import React from 'react';
import PropTypes from 'prop-types';
import MUIButton from 'material-ui/Button';

const Button = props => {
  return (
    <MUIButton
      className={props.className}
      style={props.style}
      raised={props.raised}
      color={props.color}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </MUIButton>
  );
};

Button.prototype.propTypes = {
  style: PropTypes.obj,
  raised: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default Button;
