import React from 'react';
import PropTypes from 'prop-types';
import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';
import Link from '../Link';

class AppBar extends React.Component {
  static propTypes = {
    handleNavigationToggle: PropTypes.func.isRequired,
    title: PropTypes.string,
  };
  render() {
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
          <Button
            color="contrast"
            component={({ ...props }) => <Link href="/signup" {...props} />}
          >
            Signup
          </Button>
          <Button
            color="contrast"
            component={({ ...props }) => <a href="/login/google" {...props} />}
          >
            Login
          </Button>
        </Toolbar>
      </MUIAppBar>
    );
  }
}

export default AppBar;
