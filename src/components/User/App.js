import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Progress from '../../components/Progress';

const GET_USER = gql`
  {
    getUser {
      id
      username
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
      uiEnabled
    }
  }
`;

const App = () => (
  <Query query={GET_USER}>
    {({ loading, error, data }) => {
      if (loading) return <Progress />;
      if (error) return <p>`Error :( ${console.log(error)}`</p>;

      return (
        <div style={{ marginTop: 124 }}>
          <a href="/login/google">LOGIN</a>
          <br />
          <Link to="/">Home</Link>
          <br />
          <Link to="/about">About</Link>
          <br />
          <Link to="/contact">Contact</Link>
          <br />
          <Link to="/create">Create</Link>
          <br />
          <h1>{data.getUser.username}</h1>
          {/* {data.getUser.username} */}
          {/* {this.props.children} */}
        </div>
      );
    }}
  </Query>
);

export default App;
