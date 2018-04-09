import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const Progress = props => {
  return (
    <CircularProgress style={styles} size={props.size || 50} thickness={7} />
  );
};

Progress.prototype.propTypes = {
  size: PropTypes.number,
};

export default Progress;
