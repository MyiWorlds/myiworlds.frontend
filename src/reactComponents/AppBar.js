import React from 'react';
import PropTypes from 'prop-types';
import MDAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

class AppBar extends React.Component {
  static propTypes = {
    handleNavigationToggle: PropTypes.func.isRequired,
    title: PropTypes.string,
  };
  render() {
    return (
      <MDAppBar position="fixed" style={{ zIndex: 1301 }}>
        <Toolbar>
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
          <Typography
            type="title"
            color="inherit"
            style={{
              flex: 1,
            }}
          >
            {this.props.title}
          </Typography>
          <Button href="/signup" color="contrast">
            Signup
          </Button>
          <Button href="/login" color="contrast">
            Login
          </Button>
        </Toolbar>
      </MDAppBar>
    );
  }
}

export default AppBar;
