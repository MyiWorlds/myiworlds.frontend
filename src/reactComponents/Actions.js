import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  button: {
    position: 'fixed',
    right: 24,
    bottom: 24,
  },
});

function Actions(props) {
  const { classes } = props;
  return (
    <div>
      <Button fab color="primary" aria-label="add" className={classes.button}>
        <AddIcon />
      </Button>
    </div>
  );
}

Actions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Actions);
