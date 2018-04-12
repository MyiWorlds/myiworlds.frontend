import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Progress from '../../components/Progress';

const GET_USER = gql`
  {
    getUser {
      id
      _id
      username
      email
      uiEnabled
      profileMedia {
        string
      }
      ui {
        id
        title
        lines {
          settings {
            string
            object
          }
          styles {
            string
            object
          }
        }
      }
    }
  }
`;

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  avatar: {
    margin: 10,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends React.Component {
  logout = refetch => {
    fetch('/login/clear', { method: 'POST', credentials: 'include' }).then(() =>
      refetch(),
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_USER}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${console.log(error)}`</p>;
          const user = data.getUser;

          return (
            <div>
              <div className={classes.root}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="Menu"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography
                      variant="title"
                      color="inherit"
                      className={classes.flex}
                    >
                      Title
                    </Typography>
                    {user.profileMedia ? (
                      <Avatar
                        alt={user.username}
                        src={user.profileMedia.string}
                        className={classes.avatar}
                      />
                    ) : (
                      <IconButton aria-haspopup="true" color="inherit">
                        <AccountCircle />
                      </IconButton>
                    )}
                    {user.username !== 'guest' ? (
                      <Button
                        color="inherit"
                        component={({ ...props }) => (
                          <a onClick={() => this.logout(refetch)} {...props} />
                        )}
                      >
                        Logout
                      </Button>
                    ) : (
                      <Button
                        color="inherit"
                        component={({ ...props }) => (
                          <a href="/login/google" {...props} />
                        )}
                      >
                        Login
                      </Button>
                    )}
                  </Toolbar>
                </AppBar>
              </div>
              <br />
              <Link to="/">Home</Link>
              <br />
              <Link to="/about">About</Link>
              <br />
              <Link to="/create">Create</Link>
              <br />
              <Link to="/search">Search</Link>
              <br />
              {user.username !== 'guest' ? (
                <button onClick={() => this.logout(refetch)}>Log Out</button>
              ) : (
                <a href="/login/google">LOGIN</a>
              )}
              <br />
              {user.username ? null : (
                <div>
                  <br />
                  <Link to="/add-username">Add Username</Link>
                </div>
              )}
              <br />
              <h1>Username: {user.username || 'No set username'}</h1>
              {this.props.children}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(App);
