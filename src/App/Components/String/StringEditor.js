import React from 'react';
import { Typography, TextField } from '@material-ui/core';

// Pass in onChange/all fields for TextFields

// https://material-ui.com/api/text-field/
const StringEditor = props => {
  const { children } = props;
  return <TextField {...props}>{children}</TextField>;
};

export default StringEditor;
