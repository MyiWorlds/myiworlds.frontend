import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { Typography } from '@material-ui/core';

class Description extends React.Component {
  static fragments = {
    circle: gql`
      fragment Description on Circle {
        description
        subtitle
        uid
      }
    `,
  };

  static propTypes = {
    circle: propType(Description.fragments.circle).isRequired,
  };

  render() {
    const circle = this.props.circle;

    return (
      <Typography variant="body1">
        {circle.description || 'description'}
        {circle.uid}
      </Typography>
    );
  }
}

export default Description;
