import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

class Circle extends React.Component {
  static fragments = {
    circle: gql`
      fragment Circle on Circle {
        id
        type
      }
    `,
  };

  static propTypes = {
    circle: propType(Circle.fragments.circle),
  };

  render() {
    const { circle } = this.props;

    return (() => {
      switch (circle.type) {
        case 'IMAGE':
          return <h1>123{circle.type}</h1>;
        default:
          return <h1>{circle.type}</h1>;
      }
    })();
  }
}

export default Circle;
