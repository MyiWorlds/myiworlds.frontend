import React from 'react';
import { Typography } from '@material-ui/core';

const NumberView = props => {
  const { children } = props;
  return <Typography {...props}>{children}</Typography>;
};

export default NumberView;
