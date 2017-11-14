/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Inbox';
import Hidden from 'material-ui/Hidden';
import HomeIcon from 'material-ui-icons/Home';
import SettingsIcon from 'material-ui-icons/Settings';
import PublicIcon from 'material-ui-icons/Public';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    height: '100%',
    top: '56px',
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
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
});

class Navigation extends React.Component {
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="MyiWorlds" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemText inset primary="Privacy & Terms" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Hidden smDown>
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
            <div className={classes.drawerInner}>{drawer}</div>
          </Drawer>
        </Hidden>

        <Hidden smUp>
          <Drawer
            onRequestClose={this.props.handleNavigationToggle}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.props.navOpen && classes.drawerPaperClose,
              ),
            }}
            open={this.props.navOpen}
          >
            <div className={classes.drawerInner}>{drawer}</div>
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

export default withStyles(styles, { withTheme: true })(Navigation);
