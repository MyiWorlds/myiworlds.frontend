import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
} from '@material-ui/core';

import FontIcon from '../../../Components/FontIcon';

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
  avatar: {
    height: 36,
    width: 36,
    margin: -8,
  },
});

class EditUserProfilePic extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, classes } = this.props;

    const avatarUrl = user.profileMedia
      ? `${user.profileMedia.string.substring(
          0,
          user.profileMedia.string.length - 2,
        )}200`
      : null;

    return (
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
    );
  }
}

export default withStyles(styles)(EditUserProfilePic);
