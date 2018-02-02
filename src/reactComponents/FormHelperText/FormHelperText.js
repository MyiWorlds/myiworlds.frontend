import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
// https://material-ui-next.com/api/form-helper-text/
import MUIFormHelperText from 'material-ui/Form/FormHelperText';

const styles = {};

const FormHelperText = props => {
  const { classes } = props;
  return (
    <MUIFormHelperText
      classes={props.classes}
      disabled={props.disabled}
      error={props.error}
      margin={props.margin}
      style={props.style}
    >
      {props.children}
    </MUIFormHelperText>
  );
};

FormHelperText.prototype.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  margin: PropTypes.string,
  style: PropTypes.object,
};

export default injectSheet(styles)(FormHelperText);
