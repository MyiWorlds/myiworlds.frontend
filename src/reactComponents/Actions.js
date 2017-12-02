import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Link from '../Link';

const styles = theme => ({
  button: {
    position: 'fixed',
    right: 24,
    bottom: 24,
    zIndex: 9999,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      bottom: '80px',
    },
  },
});

function Actions(props) {
  const { classes } = props;
  return (
    <div>
      {window.location.pathname !== '/create' ? (
        <Button
          fab
          color="primary"
          aria-label="add"
          className={classes.button}
          component={({ ...props }) => <Link href="/create" {...props} />}
        >
          <AddIcon />
        </Button>
      ) : null}
    </div>
  );
}

Actions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Actions);
