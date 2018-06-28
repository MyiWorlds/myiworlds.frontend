import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import classNames from 'classnames';
import injectSheet from 'react-jss';

import {
  Hidden,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import FontIcon from './Components/FontIcon';

const drawerWidth = 240;

const styles = theme => ({
  navigation: {
    overflow: 'hidden',
    width: '0px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    navigation: {
      minWidth: props => (props.showNavigation ? '240px' : '64px'),
    },
  },

  [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
    navigation: {
      minWidth: props => (props.showNavigation ? '240px' : '64px'),
    },
  },

  drawerPaper: {
    background: theme.palette.background.default,
    position: 'fixed',
    height: '100%',
    top: '0',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      top: 48,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    width: 64,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  bottomNav: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    background: theme.palette.background.default,
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
});

class Navigation extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    showNavigation: PropTypes.bool.isRequired,
    handleToggleBoolean: PropTypes.func.isRequired,
  };

  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  navItems = user => {
    const navItems = [
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'add',
        title: 'Create',
        slug: `/create`,
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'search',
        title: 'Search',
        slug: `/search`,
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'search',
        title: 'Search2',
        slug: `/search2`,
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'home',
        title: 'Home',
        slug: `/private/home`,
      },
      user && user.username
        ? {
            type: 'BUTTON',
            settings: {
              primary: true,
            },
            icon: 'public',
            title: 'Public Profile',
            slug: `/${user.username}`,
          }
        : {},
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'inbox',
        title: 'Inbox',
        slug: '/inbox',
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'query_builder',
        title: 'Recents',
        slug: '/recents',
      },
    ];

    return navItems;
  };

  render() {
    const { classes, user, showNavigation, handleToggleBoolean } = this.props;
    const navItems = this.navItems(user);

    return (
      <div className={classes.navigation}>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            onClose={() => handleToggleBoolean('showNavigation')}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !showNavigation && classes.drawerPaperClose,
              ),
            }}
            open={showNavigation}
          >
            <div className={classes.drawerInner}>
              {navItems.map((item, index) => {
                switch (item.type) {
                  case 'BUTTON': {
                    return (
                      <ListItem
                        button
                        key={item.title + index}
                        component={Link}
                        to={item.slug}
                      >
                        <ListItemIcon>
                          <FontIcon>{item.icon}</FontIcon>
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    );
                  }
                  case 'DIVIDER': {
                    return <Divider key={index} />;
                  }

                  default:
                    return null;
                }
              })}
            </div>
          </Drawer>
        </Hidden>

        <Hidden smDown>
          <div>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !showNavigation && classes.drawerPaperClose,
                ),
              }}
              onClose={() => handleToggleBoolean('showNavigation')}
              open={showNavigation}
            >
              <div className={classes.drawerInner}>
                {navItems.map((item, index) => {
                  switch (item.type) {
                    case 'BUTTON': {
                      return (
                        <ListItem
                          button
                          key={item.title + index}
                          component={({ ...props }) => (
                            <Link to={item.slug} {...props} />
                          )}
                        >
                          <ListItemIcon>
                            <FontIcon>{item.icon}</FontIcon>
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItem>
                      );
                    }
                    case 'DIVIDER': {
                      return <Divider key={index} />;
                    }
                    default:
                      return null;
                  }
                })}
              </div>
            </Drawer>
          </div>
        </Hidden>
      </div>
    );
  }
}

export default injectSheet(styles)(Navigation);
