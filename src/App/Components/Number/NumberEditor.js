import React from 'react';
import { Typography, TextField } from '@material-ui/core';

// https://material-ui.com/api/text-field/
const NumberEditor = props => {
  const { children } = props;
  return <TextField {...props}>{children}</TextField>;
};

export default NumberEditor;
