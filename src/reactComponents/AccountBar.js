import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

class AccountBar extends React.Component {
  static propTypes = {};
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="contrast"
            aria-label="Menu"
            style={{
              marginLeft: -12,
              marginRight: 20,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            type="title"
            color="inherit"
            style={{
              flex: 1,
            }}
          >
            Title
          </Typography>
          <Button color="contrast">Signup</Button>
          <Button color="contrast">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default AccountBar;
