import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Progress from '../../components/Progress';

const GET_USER = gql`
  {
    getUser {
      id
      _id
      username
      email
      uiEnabled
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

class App extends React.Component {
  logout = refetch => {
    fetch('/login/clear', { method: 'POST', credentials: 'include' }).then(() =>
      refetch(),
    );
  };

  render() {
    return (
      <Query query={GET_USER}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${console.log(error)}`</p>;
          const user = data.getUser;

          return (
            <div style={{ marginTop: 124 }}>
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
              <h1>Username: {user.username}</h1>
              {this.props.children}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
