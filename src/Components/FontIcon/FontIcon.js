import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Icon from 'material-ui/Icon';
import Button from '../Button';

const style = props => ({
  button: {
    width: props.width || 48,
    height: props.height || 'auto',
    minWidth: 0,
  },
});

const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = 'Icon';

const FontIcon = props => {
  const { classes } = props;
  const wrappedIcon = (
    <WrappedIcon style={props.style}>{props.icon}</WrappedIcon>
  );

  return props.button ? (
    <Button onClick={props.onClick} className={classes.button}>
      {wrappedIcon}
    </Button>
  ) : (
    wrappedIcon
  );
};

FontIcon.prototype.propTypes = {
  icon: PropTypes.string.isRequired,
  button: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default withStyles(style)(FontIcon);
