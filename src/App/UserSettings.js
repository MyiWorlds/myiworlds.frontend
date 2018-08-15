import React from 'react';

import { withStyles, Typography } from '@material-ui/core';

import DeleteUser from './DeleteUser';
import EditUsername from './User/Mutations/EditUsername/EditUsername';
import EditUserProfilePic from './User/Mutations/EditUserProfilePic/EditUserProfilePic';

const styles = {
  container: {
    maxWidth: '100%',
    padding: 24,
  },
};

const UserSettings = ({ user, classes }) => {
  return (
    <div className={classes.container}>
      <Typography variant="display3">Settings</Typography>
      <br />
      <br />
      <EditUserProfilePic user={user} />
      <EditUsername user={user} />
      <DeleteUser user={user} />
    </div>
  );
};

export default withStyles(styles)(UserSettings);
