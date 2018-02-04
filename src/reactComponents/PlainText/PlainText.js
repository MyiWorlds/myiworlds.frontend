import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Typography from '../Typography';
import Header from '../Header';

const circle = {
  settings: {},
  style: {
    containerStyles: {},
  },
};

const style = {};

const PlainText = props => {
  const { classes } = props;

  return (
    <div style={circle.style.containerStyles}>
      <Header
        dividerBottom={true}
        componentSize={props.componentSize}
        circle={props.circle}
      />
      <Typography style={{ margin: 8 }} type="body1">
        {props.circle.string}
      </Typography>
    </div>
  );
};

PlainText.prototype.propTypes = {
  circle: PropTypes.obj,
};

export default injectSheet(style)(PlainText);
