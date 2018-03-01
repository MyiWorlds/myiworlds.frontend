import React from 'react';
import PropTypes from 'prop-types';

import { graphql, createFragmentContainer } from 'react-relay';
import type { AppBar_user } from './__generated__/AppBar_user.graphql';

import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';
import Link from '../Link';

class AppBar extends React.Component {
  props: {
    user: AppBar_user,
  };

  static propTypes = {
    handleNavigationToggle: PropTypes.func.isRequired,
    title: PropTypes.string,
  };
  render() {
    const { user } = this.props;
    return (
      <MUIAppBar position="fixed" style={{ zIndex: 1301 }}>
        <Toolbar>
          <Hidden only="xs">
            <IconButton
              color="contrast"
              onClick={this.props.handleNavigationToggle}
              aria-label="Menu"
              style={{
                marginLeft: -12,
                marginRight: 20,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography
            type="title"
            color="inherit"
            style={{
              flex: 1,
            }}
          >
            {this.props.title}
          </Typography>
          {this.props.user._id}
          {this.props.user && this.props.user.username ? (
            <div>{this.props.user.username}</div>
          ) : (
            <div>
              <Button
                color="contrast"
                component={({ ...props }) => <Link href="/signup" {...props} />}
              >
                Signup
              </Button>
              <Button
                color="contrast"
                component={({ ...props }) => (
                  <a href="/login/google" {...props} />
                )}
              >
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </MUIAppBar>
    );
  }
}

// export default AppBar;

export default createFragmentContainer(
  AppBar,
  graphql`
    fragment AppBar_user on User {
      id
      _id
      username
      dateCreated
      homePublic {
        title
      }
    }
  `,
);
