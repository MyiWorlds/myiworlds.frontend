import React from 'react';
import PropTypes from 'prop-types';
import MUIButton from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const Button = props => {
  const { classes } = props;
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

export default withStyles(styles)(Button);
