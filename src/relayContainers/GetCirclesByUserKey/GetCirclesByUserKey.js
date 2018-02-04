/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { GetCirclesByUserKey_getCirclesByUserKey } from './__generated__/GetCirclesByUserKey_getCirclesByUserKey.graphql';
import history from '../../history';
import { List } from '../../reactComponents/List';

class GetCirclesByUserKey extends React.Component {
  // props: {
  //   circle: GetCirclesByUserKey_getCirclesByUserKey,
  // };
  onCardClick = slug => {
    history.push(slug);
  };

  render() {
    const circles = this.props.getCirclesByUserKey || {};
    return <List circles={circles} listType={'MEDIA_CARD'} hideHeader={true} />;
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
