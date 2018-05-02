import React from 'react';

import { Avatar } from 'material-ui';
import Button from 'material-ui/Button';

import DeleteUser from '../../mutations/DeleteUser';

import FontIcon from '../FontIcon';

const UserSettings = props => {
  const { user } = props;
  const avatarUrl = user.profileMedia
    ? `${user.profileMedia.string.substring(
        0,
        user.profileMedia.string.length - 2,
      )}200`
    : null;

  return (
    <div>
      <div>
        {user.profileMedia ? (
          <Avatar
            alt={user.username}
            src={avatarUrl}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <FontIcon>account_circle</FontIcon>
        )}
        Change Profile Image
        <DeleteUser uid={user.uid}>
          <Button color="primary" variant="raised">
            <FontIcon>delete</FontIcon>
            Delete
          </Button>
        </DeleteUser>
      </div>
    </div>
  );
};

export default UserSettings;
