import React from 'react';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import GET_CIRCLE_BY_USERNAME from '../../../Circle/Queries/getCircleByUsername';
import GET_USER from '../../Queries/getUser';

import Progress from '../../../Components/Progress';
import FontIcon from '../../../Components/FontIcon';

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
  textfieldProgress: {
    position: 'relative',
    width: 14,
    height: 14,
    marginRight: 4,
    marginLeft: 6,
  },
});

class EditUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      username: this.props.user.username || '',
      checkUsername: false,
      isLoading: false,
      usernameAvailable: false,
      usernameInvalid: false,
    };
    this.timeout = 0;
  }

  updateState = object => {
    this.setState(object);
  };

  handleInputChange = (key, value, refetch) => {
    this.setState({
      checkUsername: false,
      usernameAvailable: false,
      isLoading: true,
      usernameInvalid: false,
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(async () => {
      this.setState({ checkUsername: true });

      await refetch().then(res => {
        const response = res.data.getCircleByUsername;
        const usernameAvailable =
          response && response.type === 'DOES_NOT_EXIST';
        const usernameInvalid = response && response.type !== 'DOES_NOT_EXIST';

        this.setState({
          checkUsername: false,
          usernameAvailable,
          isLoading: false,
          usernameInvalid,
        });
      });
    }, 700);

    this.setState({ [key]: value });
  };

  submitForm = async (event, createUsername, usernameInvalid) => {
    event.preventDefault();

    if (usernameInvalid) {
      return;
    }

    await createUsername({
      variables: {
        input: {
          username: this.state.username,
          dateUpdated: Date.now(),
        },
      },
      refetchQueries: [{ query: GET_USER }],
    });

    this.setState({
      expanded: false,
      checkUsername: false,
    });
  };

  handleCancel = user => {
    this.updateState({
      username: user.username || '',
      expanded: false,
      checkUsername: false,
      usernameInvalid: false,
    });
  };

  render() {
    const {
      username,
      checkUsername,
      expanded,
      isLoading,
      usernameAvailable,
      usernameInvalid,
    } = this.state;
    const { user, classes } = this.props;

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
                  fetchPolicy="no-cache"
                  skip={!checkUsername}
                >
                  {({ loading, error, data, refetch }) => {
                    if (error) return <p>Error :( {console.log(error)}</p>;
                    const progress = (
                      <div className={classes.textfieldProgress}>
                        <Progress hideBackground size={24} />
                      </div>
                    );

                    const userIcon = (
                      <FontIcon
                        style={{
                          color: usernameInvalid ? 'red' : 'green',
                        }}
                      >
                        account_circle
                      </FontIcon>
                    );

                    let usernameMessage = null;
                    let textfieldIcon = null;

                    if (isLoading) {
                      usernameMessage = 'Checking if available...';
                      textfieldIcon = progress;
                    } else if (usernameAvailable) {
                      usernameMessage = 'Yes this username is available!';
                      textfieldIcon = userIcon;
                    } else {
                      usernameMessage = 'Please try another unique username';
                      textfieldIcon = userIcon;
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
                              onChange={event =>
                                this.handleInputChange(
                                  'username',
                                  event.target.value,
                                  refetch,
                                )
                              }
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
                            onClick={() => this.handleCancel(user)}
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={event =>
                              this.submitForm(event, createUsername)
                            }
                            variant="raised"
                            color="primary"
                            type="submit"
                            disabled={!usernameAvailable || isLoading}
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
