import React from 'react';
import { withStyles, Card, Typography } from '@material-ui/core';

const styles = {
  card: {
    margin: 24,
    padding: 24,
  },
};

const NotFound = props => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <Typography variant="display3">Ruh Row</Typography>
      <Typography variant="display1">That page was not found.</Typography>
      <Typography variant="title">Try searching for another page</Typography>
    </Card>
  );
};

export default withStyles(styles)(NotFound);
