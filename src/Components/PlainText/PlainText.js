import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Typography';
import TextField from '../TextField';

const defaultStyles = {
  stringContainer: {
    display: 'flex',
    margin: '0 auto',
    flexWrap: 'wrap',
    // margin: '42px 12px 24px 12px',
    maxWidth: 800,
  },
  string: {},
};

const PlainText = props => {
  const editingPlainText = (
    <TextField
      inputProps={{
        style: props.circle.string
          ? props.circle.styles && props.circle.styles.string
            ? props.circle.styles.string
            : defaultStyles.string
          : null,
      }}
      id="plainText"
      label="Text"
      fullWidth={true}
      multiline
      margin="normal"
      value={props.circle.string}
      onChange={props.handleStateEventChange('string')}
    />
  );

  const plainText = (
    <Typography
      style={
        props.circle.styles && props.circle.styles.string
          ? props.circle.styles.string
          : defaultStyles.string
      }
      type={
        props.circle.settings && props.circle.settings.plainTextType
          ? props.circle.settings.plainTextType
          : 'body1'
      }
    >
      {props.circle.string}
    </Typography>
  );

  return (
    <div
      style={
        props.circle.styles && props.circle.styles.containerStyles
          ? props.circle.styles.containerStyles
          : defaultStyles.stringContainer
      }
    >
      {props.editing ? editingPlainText : plainText}
    </div>
  );
};

PlainText.prototype.propTypes = {
  circle: PropTypes.obj,
  handleStateEventChange: PropTypes.func,
};

export default PlainText;
