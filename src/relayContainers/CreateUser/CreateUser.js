/* @flow */

import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import CreateUserMutation from './CreateUserMutation';
import { createFragmentContainer, graphql } from 'react-relay';

class CreateUser extends React.Component {
  // props: {
  //   user: CreateUser_user,
  // };

  state = {
    email: '',
    username: '',
    password: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  createUser = () => {
    CreateUserMutation.commit(this.props.relay.environment, {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    });
  };

  render() {
    return (
      <div style={{ padding: 24 }}>
        <Typography type="display2" gutterBottom>
          Signup
        </Typography>
        <a href="/login/google">Sign In</a>

        <TextField
          required
          id="email"
          label="Email"
          margin="normal"
          onChange={this.handleChange('email')}
        />
        <br />
        <TextField
          required
          id="Username"
          label="Username"
          margin="normal"
          onChange={this.handleChange('username')}
        />
        <br />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          onChange={this.handleChange('password')}
        />
        <br />
        <br />
        <Button raised color="primary" onClick={this.createUser}>
          Signup
        </Button>
      </div>
    );
  }
}

export default CreateUser;
