import React from 'react';
import { Avatar } from 'material-ui';
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
      </div>
    </div>
  );
};

export default UserSettings;
