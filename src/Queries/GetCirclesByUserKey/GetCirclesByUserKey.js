/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { GetCirclesByUserKey_getCirclesByUserKey } from './__generated__/GetCirclesByUserKey_getCirclesByUserKey.graphql';
import history from '../../history';

import { List } from '../../Components/List';

const circleList = {
  type: 'LIST_QUERY',
  slug: '/recents/daveyedwards',
  settings: {
    blob: {
      actions: [
        {
          type: 'BUTTON_FUNCTION',
          title: 'VIEW',
          string: '/${this.circle.slug}',
        },
        {
          type: 'FONTICON_FUNCTION',
          blob: {},
          type: 'BUTTON',
          title: 'VIEW',
          string: '/${this.circle.slug}',
        },
      ],
    },
  },
  blob: {
    query: [
      {
        type: 'FUNCTION', // Type function transforms the value
        property: 'creator',
        condition: '=',
        value: 'creator.toLowerCase()',
      },
      {
        type: 'FUNCTION',
        property: 'dateUpdated',
        condition: '<',
        value: 'Date.now().toString()',
      },
    ],
  },
  linesMany: [], // results from query
};
class GetCirclesByUserKey extends React.Component {
  // props: {
  //   circle: GetCirclesByUserKey_getCirclesByUserKey,
  // };
  onCardClick = slug => {
    history.push(slug);
  };

  render() {
    const circles = this.props.getCirclesByUserKey || {};
    return (
      <List
        circles={circles}
        listType={'MEDIA_CARD'}
        actions={circleList}
        hideHeader={true}
      />
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
      settings {
        _id
        lines {
          _id
        }
      }
      type
      title
      subtitle
      description
      string
    }
  `,
);
