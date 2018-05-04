import React from 'react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({});

const PleaseLogin = props => {
  return (
    <div>
      <h1>You must Login to view this page</h1>
      <Button
        variant="raised"
        color="primary"
        onClick={() => {
          if (window) {
            window.location.href = '/login/google';
          }
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default withStyles(styles)(PleaseLogin);
