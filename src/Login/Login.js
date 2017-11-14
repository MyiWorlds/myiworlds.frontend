/* @flow */

import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import LoginMutation from './LoginMutation';
import { createFragmentContainer, graphql } from 'react-relay';
import type { Login_user } from './__generated__/Login_user.graphql';

class Login extends React.Component {
  props: {
    user: Login_user,
  };

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

  loginUser = () => {
    LoginMutation.commit(
      this.props.relay.environment,
      {
        username: this.state.username,
        password: this.state.password,
      },
      this.props.user.id,
    );
  };
  render() {
    return (
      <div style={{ padding: 24 }}>
        <Typography type="display2" gutterBottom>
          Login
        </Typography>
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
        <Button raised color="primary" onClick={this.loginUser}>
          Signup
        </Button>
      </div>
    );
  }
}

export default createFragmentContainer(
  Login,
  graphql`
    fragment Login_user on User {
      id
    }
  `,
);
