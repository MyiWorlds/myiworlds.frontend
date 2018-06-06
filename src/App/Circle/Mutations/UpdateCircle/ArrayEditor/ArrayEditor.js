import React from 'react';
import {
  AppBar,
  Button,
  Dialog,
  // Divider,
  IconButton,
  // List,
  // ListItem,
  // ListItemText,
  // CardHeader,
  // IconButton,
  Toolbar,
  Typography,
  Slide,
  withStyles,
} from '@material-ui/core';
import FontIcon from '../../../../Components/FontIcon';
import CirclesByUserKey from '../../../Components/CirclesByUserKey/CirclesByUserKey';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

const ArrayEditor = ({
  id,
  show,
  classes,
  stateLine,
  stateLines,
  title,
  handleSetState,
  stateKey,
  listItemType,
}) => {
  return (
    <Dialog
      fullScreen
      open={show}
      onClose={() => handleSetState(id, false)}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => handleSetState(id, false)}
            aria-label="Close"
          >
            <FontIcon>close</FontIcon>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {title}
          </Typography>
          <Button
            variant="raised"
            color="primary"
            onClick={() => handleSetState(id, false)}
          >
            Select
          </Button>
        </Toolbar>
      </AppBar>

      <CirclesByUserKey
        handleSetState={handleSetState}
        stateLine={stateLine}
        stateLines={stateLines}
        listItemType={listItemType}
        stateKey={stateKey}
      />
    </Dialog>
  );
};

export default withStyles(styles)(ArrayEditor);
