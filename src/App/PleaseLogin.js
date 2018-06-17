import React from 'react';
import { Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({});

class PleaseLogin extends React.Component {
  state = {
    redirect: false,
  };
  render() {
    const { redirect } = this.state;

    return redirect ? (
      <Redirect to="/login/google" />
    ) : (
      <div>
        <h1>You must Login to view this page</h1>
        <Button
          variant="raised"
          color="primary"
          onClick={() => {
            this.setState({ redirect: true });
          }}
        >
          Login
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(PleaseLogin);
