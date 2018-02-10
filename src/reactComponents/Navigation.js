/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';
import BottomNavigation, {
  BottomNavigationAction,
} from 'material-ui/BottomNavigation';
import Link from '../Link';
import Icon from 'material-ui/Icon';

const drawerWidth = 240;

const style = theme => ({
  drawerPaper: {
    background: theme.palette.background.default,
    position: 'fixed',
    height: '100%',
    top: '0',
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      top: `64px`,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    width: 60,
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
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    const WrappedIcon = props => <Icon {...props} />;
    WrappedIcon.muiName = 'Icon';

    const navItems = [
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'home',
        title: 'Home',
        slug: `/private/daveyusername1`,
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'public',
        title: 'MyiWorlds',
        slug: '/daveyusername1',
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'inbox',
        title: 'Inbox',
        slug: '/daveyedwards/inbox',
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
      {
        type: 'DIVIDER',
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'settings',
        title: 'Settings',
        slug: '/daveyedwards/settings',
      },
      {
        type: 'DIVIDER',
      },
      {
        type: 'BUTTON',
        title: 'Privacy & Terms',
        slug: '/',
      },
    ];

    return (
      <div>
        <Hidden smUp>
          <BottomNavigation
            style={{ zIndex: 1501 }}
            className={classes.bottomNav}
            value={value}
            onChange={this.handleChange}
            showLabels
          >
            {navItems.map(item => {
              return item.settings && item.settings.primary ? (
                <BottomNavigationAction
                  key={item.title}
                  style={{ minWidth: 40 }}
                  component={({ ...props }) => (
                    <Link href={item.slug} {...props} />
                  )}
                  label={item.title}
                  icon={item.icon}
                />
              ) : null;
            })}
            <BottomNavigationAction
              key="menu"
              onClick={this.props.handleNavigationToggle}
              label="Menu"
              icon="menu"
            />
          </BottomNavigation>
        </Hidden>

        <Hidden smUp>
          <Drawer
            type="temporary"
            onClose={this.props.handleNavigationToggle}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.props.navOpen && classes.drawerPaperClose,
              ),
            }}
            open={this.props.navOpen}
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
                          <Link href={item.slug} {...props} />
                        )}
                      >
                        <ListItemIcon>
                          <WrappedIcon>{item.icon}</WrappedIcon>
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

        <Hidden only="xs" mdUp>
          <div>
            <Drawer
              type="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.props.navOpen && classes.drawerPaperClose,
                ),
              }}
              onClose={this.props.handleNavigationToggle}
              open={this.props.navOpen}
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
                            <Link href={item.slug} {...props} />
                          )}
                        >
                          <ListItemIcon>
                            <WrappedIcon>{item.icon}</WrappedIcon>
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
            {this.props.navOpen ? (
              // Cant get it to fade in
              <div
                onClick={this.props.handleNavigationToggle}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'fixed',
                  zIndex: 1000,
                  backgroundColor: 'rgba(0, 0, 0, 0.54)',
                  transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                  opacity: 1,
                  willChange: 'opactiy',
                }}
              />
            ) : null}
          </div>
        </Hidden>

        <Hidden only="xs">
          <Drawer
            type="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.props.navOpen && classes.drawerPaperClose,
              ),
            }}
            open={this.props.navOpen}
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
                          <Link href={item.slug} {...props} />
                        )}
                      >
                        <ListItemIcon>
                          <WrappedIcon>{item.icon}</WrappedIcon>
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
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(style, { withTheme: true }, withWidth())(Navigation);
