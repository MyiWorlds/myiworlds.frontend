import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import MUITextField from 'material-ui/TextField';

const style = {};

const TextField = props => {
  const { classes } = props;
  return (
    <MUITextField
      required={props.required}
      id={props.id}
      label={props.label}
      margin={props.margin}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
      type={props.type}
      fullWidth={props.fullWidth}
      style={props.style}
      multiline={props.multiline}
      {...props}
    />
  );
};

TextField.prototype.propTypes = {
  required: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  fullWidth: PropTypes.string,
  style: PropTypes.object,
  multiline: PropTypes.bool,
};

export default injectSheet(style)(TextField);
