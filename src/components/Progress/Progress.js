import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const Progress = props => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Paper
        elevation={5}
        style={{
          position: 'relative',
          height: props.size * 1.25 || 50,
          width: props.size * 1.25 || 50,
          borderRadius: '50%',
        }}
      >
        <CircularProgress
          style={styles}
          size={props.size || 35}
          thickness={7}
        />
      </Paper>
    </div>
  );
};

Progress.prototype.propTypes = {
  size: PropTypes.number,
};

export default Progress;
