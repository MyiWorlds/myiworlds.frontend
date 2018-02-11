import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
const LoadingIndicator = props => {
  return <CircularProgress style={style} size={props.size || 50} />;
};

LoadingIndicator.prototype.propTypes = {
  size: PropTypes.number,
};

export default LoadingIndicator;
