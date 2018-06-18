import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';

const styles = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Progress extends React.Component {
  static propTypes = {
    size: PropTypes.number,
  };

  componentWillMount() {
    this.setState({
      zoom: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      zoom: false,
    });
  }

  render() {
    const { classes, size, hideBackground } = this.props;
    const { zoom } = this.state;

    let progressSize = size || 35;

    const progressCircle = (
      <CircularProgress
        style={{
          position: 'absolute',
          top: progressSize / hideBackground ? 4 : 8,
          left: progressSize / hideBackground ? 4 : 8,
        }}
        className={classes.progress}
        size={progressSize}
        thickness={5}
      />
    );

    return (
      <div className={classes.container}>
        <Zoom in={zoom}>
          {hideBackground ? (
            <div
              style={{
                position: 'relative',
                height: size * 1.25 || 50,
                width: size * 1.25 || 50,
              }}
            >
              {progressCircle}
            </div>
          ) : (
            <Paper
              elevation={5}
              style={{
                position: 'relative',
                height: size * 1.25 || 50,
                width: size * 1.25 || 50,
                borderRadius: '50%',
              }}
            >
              {progressCircle}
            </Paper>
          )}
        </Zoom>
      </div>
    );
  }
}

export default withStyles(styles)(Progress);
