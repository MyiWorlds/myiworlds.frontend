/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { GetCirclesByUserKey_getCirclesByUserKey } from './__generated__/GetCirclesByUserKey_getCirclesByUserKey.graphql';
import ComponentController from '../../reactComponents/ComponentController/ComponentController';
import Link from '../../Link';
import Card from '../../reactComponents/Card';
import history from '../../history';

class GetCirclesByUserKey extends React.Component {
  // props: {
  //   circle: GetCirclesByUserKey_getCirclesByUserKey,
  // };
  onCardClick = slug => {
    history.push(slug);
  };

  render() {
    const circles = this.props.getCirclesByUserKey || {};
    console.log(circles);
    return (
      <div>
        {circles.map(circle => {
          return (
            <Card
              key={circle.id}
              style={{ margin: 42 }}
              onClick={() => this.onCardClick(circle.slug)}
            >
              <ComponentController circle={circle} />
            </Card>
          );
        })}
      </div>
    );
  }
}

export default createFragmentContainer(
  GetCirclesByUserKey,
  graphql`
    fragment GetCirclesByUserKey_getCirclesByUserKey on Circle
      @relay(plural: true) {
      id
      slug
      type
      title
      subtitle
      description
      string
    }
  `,
);
