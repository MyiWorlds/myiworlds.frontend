import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from 'material-ui/Typography';
import AppBarMUI from 'material-ui/AppBar';

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
    fontSize: '1.2125rem',
  },
});

class AppBar extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  state = {
    userMenu: false,
  };

  render() {
    const { classes, handleNavigationToggle } = this.props;

    return (
      <AppBarMUI className={classes.appBar}>
        <Toolbar style={{ minHeight: 48 }}>
          <IconButton
            className={classes.menuButton}
            onClick={handleNavigationToggle}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            className={classes.siteTitle}
          >
            MyiWorlds
          </Typography>
        </Toolbar>
      </AppBarMUI>
    );
  }
}

export default withStyles(styles)(AppBar);
