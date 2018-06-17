import React from 'react';

import {
  Avatar,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
} from '@material-ui/core';

import DeleteUser from './DeleteUser';
import EditUsername from './EditUsername';
import FontIcon from './Components/FontIcon';

const styles = theme => ({
  container: {
    maxWidth: '100%',
    padding: 24,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  avatar: {
    height: 36,
    width: 36,
    margin: -8,
  },
});

const UserSettings = ({ user, classes }) => {
  // Make button, display placeholder text and button says change or add
  // Fix route to allow you to change your username again
  const avatarUrl = user.profileMedia
    ? `${user.profileMedia.string.substring(
        0,
        user.profileMedia.string.length - 2,
      )}200`
    : null;

  return (
    <div className={classes.container}>
      <Typography variant="display3">Settings</Typography>
      <br />
      <br />
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<FontIcon>expand_more</FontIcon>}>
          <Typography className={classes.heading}>Profile Picture</Typography>
          <div className={classes.secondaryHeading}>
            {user.profileMedia ? (
              <Avatar
                alt={user.username}
                src={avatarUrl}
                className={classes.avatar}
              />
            ) : (
              <FontIcon>account_circle</FontIcon>
            )}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>Add some upload/change profile picture stuff</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <EditUsername user={user} />

      <DeleteUser user={user} />
    </div>
  );
};

export default withStyles(styles)(UserSettings);
