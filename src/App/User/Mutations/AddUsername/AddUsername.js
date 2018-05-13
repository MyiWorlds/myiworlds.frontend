import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

import { Button } from 'material-ui';
import TextField from 'material-ui/TextField';

import GET_USER from '../../Queries/getUser';
import GET_CIRCLE_BY_USERNAME from '../../../Circle/Queries/getCircleByUsername';

import Progress from '../../../Components/Progress';

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

class AddUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      checkUsername: false,
      usernameAvailable: false,
    };
    this.timeout = 0;
  }

  handleInputChange = name => event => {
    this.setState({ checkUsername: false });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.setState({ checkUsername: true });
    }, 500);

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
    const { username, checkUsername } = this.state;

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
                <Query
                  query={GET_CIRCLE_BY_USERNAME}
                  variables={{
                    username: username,
                  }}
                  skip={!checkUsername}
                >
                  {({ loading, error, data }) => {
                    if (error) return <p>Error :( {console.log(error)}</p>;

                    const usernameInvalid =
                      data.getCircleByUsername &&
                      data.getCircleByUsername.type !== 'DOES_NOT_EXIST' &&
                      username !== '' &&
                      !loading;

                    let usernameMessage = null;

                    if (username === '') {
                      usernameMessage = 'Please enter a username';
                    } else if (loading) {
                      usernameMessage = '';
                    } else if (
                      data.getCircleByUsername &&
                      data.getCircleByUsername.type === 'DOES_NOT_EXIST'
                    ) {
                      usernameMessage = 'Yes this username is available!';
                    } else {
                      usernameMessage =
                        'That username is already taken, please try another';
                    }

                    return (
                      <form
                        onSubmit={event =>
                          this.submitForm(event, createUsername, data)
                        }
                      >
                        <TextField
                          label="Username"
                          margin="normal"
                          value={username}
                          onChange={this.handleInputChange('username')}
                          error={usernameInvalid}
                          helperText={usernameMessage}
                        />
                        <Button
                          // style={{ float: 'right' }}
                          variant="raised"
                          color="primary"
                          type="submit"
                        >
                          Add Username
                        </Button>
                      </form>
                    );
                  }}
                </Query>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default AddUsername;
