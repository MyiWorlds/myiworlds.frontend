import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import GET_USER from '../../queries/root/getUser';

import Progress from '../../components/Progress';

const ADD_USERNAME = gql`
  mutation createUsername($input: createUsernameInput!) {
    createUsername(input: $input) {
      message
      updatedUser {
        id
        username
      }
    }
  }
`;

// const CHECK_USERNAME_NOT_TAKEN = gql`
// {}
// `;

class AddUsername extends React.Component {
  state = {
    username: '',
    creator: '',
    dateCreated: 0,
  };

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitForm = (event, createUsername, data) => {
    event.preventDefault();

    createUsername({
      variables: {
        input: {
          username: this.state.username,
          dateUpdated: Date.now(),
        },
      },
      refetchQueries: [{ query: GET_USER }],
    });

    if (window) {
      window.location.href = '/';
    }
  };

  render() {
    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${console.log(error)}`</p>;
          if (data.getUser.username) {
            return (
              <div>
                You already have a username, you can not currently change it
              </div>
            );
          }

          return (
            <Mutation mutation={ADD_USERNAME}>
              {(createUsername, { data }) => (
                <div>
                  <div>
                    {data && data.createUsername
                      ? data.createUsername.message
                      : null}
                  </div>
                  <form
                    onSubmit={event =>
                      this.submitForm(event, createUsername, data)
                    }
                  >
                    <input
                      value={this.state.username}
                      onChange={this.handleInputChange('username')}
                    />
                    <button type="submit">Add Username</button>
                  </form>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default AddUsername;
