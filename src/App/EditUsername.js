import React from 'react';

import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import GET_CIRCLE_BY_USERNAME from './Circle/Queries/getCircleByUsername';
import GET_USER from './User/Queries/getUser';

import Progress from './Components/Progress';
import FontIcon from './Components/FontIcon';

import {
  Button,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Divider,
  InputAdornment,
  TextField,
} from '@material-ui/core';

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

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class EditUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      username: this.props.user.username || '',
      checkUsername: false,
      usernameAvailable: false,
      redirect: false,
    };
    this.timeout = 0;
  }

  updateState = object => {
    this.setState(object);
  };

  handleInputChange = name => event => {
    this.setState({ checkUsername: false, usernameAvailable: false });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.setState({ checkUsername: true });
    }, 700);

    this.setState({ [name]: event.target.value });
  };

  submitForm = (event, createUsername, usernameInvalid) => {
    event.preventDefault();

    if (usernameInvalid) {
      return;
    }

    createUsername({
      variables: {
        input: {
          username: this.state.username,
          dateUpdated: Date.now(),
        },
      },
      refetchQueries: [{ query: GET_USER }],
    });

    this.setState({ redirect: true });
  };

  render() {
    const { username, checkUsername, redirect, expanded } = this.state;
    const { user, classes } = this.props;

    if (redirect) {
      return <Redirect to={'/settings'} />;
    }

    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${console.log(error)}`</p>;

          return (
            <Mutation mutation={ADD_USERNAME}>
              {(createUsername, { data }) => (
                <Query
                  query={GET_CIRCLE_BY_USERNAME}
                  variables={{
                    username: username,
                  }}
                  fetchPolicy="network-only"
                  skip={!checkUsername}
                >
                  {({ loading, error, data }) => {
                    if (error) return <p>Error :( {console.log(error)}</p>;

                    const usernameAvailable =
                      data.getCircleByUsername &&
                      data.getCircleByUsername.type === 'DOES_NOT_EXIST';

                    const usernameInvalid =
                      !usernameAvailable &&
                      (username === '' || (!loading && checkUsername));

                    const userIcon = (
                      <FontIcon
                        style={{
                          color: usernameInvalid ? 'red' : 'green',
                        }}
                      >
                        account_circle
                      </FontIcon>
                    );

                    const progress = (
                      <div
                        style={{
                          position: 'relative',
                          width: 14,
                          height: 14,
                          marginRight: 4,
                          marginLeft: 6,
                        }}
                      >
                        <Progress hideBackground size={24} />
                      </div>
                    );

                    let usernameMessage = null;
                    let textfieldIcon = userIcon;

                    if (user.username === username || username === '') {
                      usernameMessage = 'Please enter a unique username';
                    } else if (!checkUsername) {
                      usernameMessage = 'Checking if available...';
                      textfieldIcon = progress;
                    } else if (usernameInvalid) {
                      usernameMessage =
                        'That username is already taken, please try another';
                    } else {
                      usernameMessage = 'Yes this username is available!';
                    }

                    return (
                      <ExpansionPanel expanded={expanded}>
                        <ExpansionPanelSummary
                          onClick={() =>
                            this.updateState({ expanded: !expanded })
                          }
                          expandIcon={<FontIcon>expand_more</FontIcon>}
                        >
                          <Typography className={classes.heading}>
                            Username
                          </Typography>
                          <Typography className={classes.secondaryHeading}>
                            {user.username}
                          </Typography>
                        </ExpansionPanelSummary>

                        <Divider />

                        <ExpansionPanelDetails>
                          <div>
                            <br />
                            <Typography variant="title">
                              {user.username
                                ? 'Edit Username'
                                : 'Create Username'}
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="body2">
                              {user.username !== ''
                                ? 'This will change all your previous URLs you may have posted around the internet. All your old URLs will have your new username infront.'
                                : 'Choose your username. Think hard as you should avoid changing your username at all costs! If you post custom URLs containing your username it will point to your new one.'}
                              <br />
                              <br />
                              You may unlock more usernames by clicking here,
                              the cost will increase for every username you take
                              from others using.
                              <br />
                              <br />
                            </Typography>

                            <TextField
                              label="Username"
                              margin="normal"
                              value={username}
                              fullWidth
                              onChange={this.handleInputChange('username')}
                              error={usernameInvalid}
                              helperText={usernameMessage}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {textfieldIcon}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </ExpansionPanelDetails>

                        <Divider />

                        <ExpansionPanelActions>
                          <Button
                            onClick={() =>
                              this.updateState({
                                username: user.username || '',
                                expanded: false,
                                checkUsername: false,
                              })
                            }
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button
                            // style={{ float: 'right' }}
                            onClick={event =>
                              this.submitForm(event, createUsername)
                            }
                            variant="raised"
                            color="primary"
                            type="submit"
                            disabled={
                              usernameInvalid || username === user.username
                            }
                          >
                            Edit
                          </Button>
                        </ExpansionPanelActions>
                      </ExpansionPanel>
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

export default withStyles(styles)(EditUsername);
