import React from 'react';
import injectSheet from 'react-jss';
import Routes from './Routes';

import Paper from 'material-ui/Paper';

const styles = theme => ({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    position: 'relative',
    // height: '100%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.complex,
    }),
  },

  content: {
    position: 'relative',
    zIndex: 1,
    flexGrow: 1,
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
});

const Content = props => {
  const { classes, user } = props;
  return (
    <div className={classes.container}>
      <Paper className={classes.content}>
        <Routes user={user} />
      </Paper>
    </div>
  );
};

export default injectSheet(styles)(Content);
