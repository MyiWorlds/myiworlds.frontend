import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  ListItemIcon,
  ListItemText,
  withStyles,
  Menu,
  MenuItem,
  Switch,
  ListItemSecondaryAction,
  Tooltip,
} from '@material-ui/core';
import AppBarMUI from '@material-ui/core/AppBar';
// import MenuIcon from '@material-ui/icons/MenuIcon';

import FontIcon from './Components/FontIcon';

import logout from './functions/logout';

const styles = theme => ({
  appBar: {
    height: 48,
    left: 0,
    display: 'flex',
    zIndex: 1201,
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  siteTitle: {
    flexGrow: 1,
    fontSize: '1.2125rem',
  },
  avatar: {
    height: 36,
    width: 36,
  },
});

class AppBar extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    handleToggleBoolean: PropTypes.func.isRequired,
    themeDark: PropTypes.bool.isRequired,
  };

  state = {
    userMenu: false,
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      classes,
      handleNavigationToggle,
      user,
      handleToggleBoolean,
      themeDark,
    } = this.props;
    const open = Boolean(anchorEl);

    const login = (
      <Button
        variant="raised"
        color="primary"
        onClick={() => {
          if (window) {
            window.location.href = '/login/google';
          }
        }}
      >
        <FontIcon style={{ marginRight: 8 }}>account_circle</FontIcon>
        Login / Signup
      </Button>
    );

    const userLink =
      user && user.username ? (
        <MenuItem component={Link} to={`/${user.username}`}>
          <ListItemText primary={user.username} />
        </MenuItem>
      ) : null;

    const logoutBtn = (
      <MenuItem button key="logout" onClick={() => logout()}>
        <ListItemIcon>
          <FontIcon>exit_to_app</FontIcon>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    );

    return (
      <AppBarMUI className={classes.appBar}>
        <Toolbar style={{ minHeight: 48 }}>
          <IconButton
            className={classes.menuButton}
            onClick={handleNavigationToggle}
            color="inherit"
            aria-label="Menu"
          >
            <FontIcon>menu</FontIcon>
          </IconButton>

          <Typography
            variant="title"
            color="inherit"
            className={classes.siteTitle}
          >
            MyiWorlds
          </Typography>

          <div>
            <Tooltip id="tooltip-icon" title="Dark Theme">
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={() => handleToggleBoolean('themeDark')}
                color="inherit"
              >
                <FontIcon>invert_colors</FontIcon>
              </IconButton>
            </Tooltip>
            {user ? (
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                {user.profileMedia ? (
                  <Avatar
                    alt={user.username}
                    src={user.profileMedia.string}
                    className={classes.avatar}
                  />
                ) : (
                  <FontIcon>account_circle</FontIcon>
                )}
              </IconButton>
            ) : (
              login
            )}
            <Menu
              style={{ top: 32 }}
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
            >
              {user ? userLink : null}
              <MenuItem
                onClick={this.handleClose}
                component={Link}
                to="/settings"
              >
                <ListItemIcon>
                  <FontIcon>settings</FontIcon>
                </ListItemIcon>
                Settings
              </MenuItem>

              <MenuItem onClick={() => handleToggleBoolean('themeDark')}>
                <ListItemIcon>
                  <FontIcon>invert_colors</FontIcon>
                </ListItemIcon>
                <ListItemText primary="Dark Theme" style={{ width: 150 }} />
                <ListItemSecondaryAction>
                  <Switch
                    checked={themeDark}
                    onChange={() => handleToggleBoolean('themeDark')}
                    value={themeDark}
                  />
                </ListItemSecondaryAction>
              </MenuItem>

              <Divider />

              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <FontIcon>report</FontIcon>
                </ListItemIcon>
                Privacy Policy
              </MenuItem>

              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <FontIcon>subject</FontIcon>
                </ListItemIcon>
                Terms of Service
              </MenuItem>
              <Divider />
              {user ? logoutBtn : null}
            </Menu>
          </div>
        </Toolbar>
      </AppBarMUI>
    );
  }
}

export default withStyles(styles)(AppBar);
