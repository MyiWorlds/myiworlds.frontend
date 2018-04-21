import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

class Lines extends React.Component {
  static fragments = {
    circle: gql`
      fragment Lines on Circle {
        lines {
          id
          type
          title
        }
      }
    `,
  };

  static propTypes = {
    circle: propType(Lines.fragments.circle).isRequired,
  };

  render() {
    const circle = this.props.circle;

    return (
      <div>
        {circle.lines
          ? circle.lines.map(circle => {
              return (
                <div key={circle.id}>
                  {circle.id}
                  {circle.title}
                  {circle.type}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default Lines;
