import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { compose } from 'react-apollo';

class Description extends React.Component {
  static fragments = {
    circle: gql`
      fragment Description on Circle {
        description
        subtitle
      }
    `,
  };

  static propTypes = {
    circle: propType(Description.fragments.circle).isRequired,
  };

  render() {
    const circle = this.props.circle;

    return <div>{circle.description || 'description'}</div>;
  }
}

export default compose()(Description);
