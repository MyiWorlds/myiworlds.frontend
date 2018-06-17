import React from 'react';

import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

import {
  Slide,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  InputAdornment,
} from '@material-ui/core';

import GET_CIRCLE_BY_USERNAME from '../../../Circle/Queries/getCircleByUsername';

import FontIcon from '../../../Components/FontIcon';
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const UsernameForm = ({
  user,
  createUsername,
  data,
  checkUsername,
  showEditUsername,
  username,
  usernameInvalid,
  handleInputChange,
  handleClose,
  submitForm,
}) => {
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
              <Dialog
                open={showEditUsername}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title" />
                <DialogContent>
                  <DialogContentText />
                </DialogContent>
              </Dialog>
            );
          }}
        </Query>
      )}
    </Mutation>
  );
};

export default UsernameForm;
