import React from 'react';

import {
  Button,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Divider,
} from '@material-ui/core';

import DeleteUserMutation from './User/Mutations/DeleteUser';
import FontIcon from './Components/FontIcon';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class DeleteUser extends React.Component {
  state = {
    clickCount: 0,
    expanded: false,
  };

  updateState = object => {
    this.setState(object);
  };

  render() {
    const { clickCount, expanded } = this.state;
    const { user, classes } = this.props;

    const realDeleteBtn = (
      <DeleteUserMutation uid={user.uid}>
        <Button color="secondary" variant="raised">
          <FontIcon style={{ marginRight: 8 }}>delete_forever</FontIcon>
          Delete Account
        </Button>
      </DeleteUserMutation>
    );

    const counterDeleteBtn = (
      <Button
        color="primary"
        variant="raised"
        onClick={() => this.setState({ clickCount: clickCount + 1 })}
      >
        <FontIcon style={{ marginRight: 8 }}>delete_forever</FontIcon>
        Delete Account ({5 - clickCount})
      </Button>
    );

    return (
      <ExpansionPanel expanded={expanded}>
        <ExpansionPanelSummary
          onClick={() => this.updateState({ expanded: !expanded })}
          expandIcon={<FontIcon>expand_more</FontIcon>}
        >
          <Typography className={classes.heading}>Delete Account</Typography>
        </ExpansionPanelSummary>

        <Divider />

        <ExpansionPanelDetails>
          <Typography variant="body1">
            Are you sure you want to delete your account? This will permenently
            delete your account and any data that you labled as personally
            identifiable.
            <br />
            <br />
            This data will be removed from this universe and never accessible
            again. Unless if you had content that was public and someone copied
            it while it was there.
            <br />
            <br />
            You must click the delete button {5 - clickCount} times to unlock
            deleting your account
          </Typography>
        </ExpansionPanelDetails>

        <Divider />

        <ExpansionPanelActions>
          {clickCount !== 0 ? (
            <Button
              onClick={() =>
                this.updateState({
                  expanded: false,
                  clickCount: 0,
                })
              }
              color="primary"
            >
              Cancel
            </Button>
          ) : null}
          {clickCount >= 5 ? realDeleteBtn : counterDeleteBtn}
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(DeleteUser);
