/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { GetCirclesByUserKey_getCirclesByUserKey } from './__generated__/GetCirclesByUserKey_getCirclesByUserKey.graphql';
import history from '../../history';

import { List } from '../../Components/List';
import ComponentController from '../../Components/ComponentController';

let listCircle = {
  title: 'Recents',
  type: 'GRID',
  slug: '/recents/daveyedwards',
  // slug: '/daveyedwards/recents',
  styles: {
    blob: {},
  },
  settings: {
    listType: 'MEDIA_CARD',
    // hideHeader: true,
    blob: {
      actions: [
        {
          type: 'BUTTON_FUNCTION',
          title: 'VIEW',
          string: '/${this.circle.slug}',
        },
        {
          // type: 'FONTICON_FUNCTION',
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
  lines: [],
  // linesMany: [], // Need to make results from query edge and put here
};

class GetCirclesByUserKey extends React.Component {
  // props: {
  //   circle: GetCirclesByUserKey_getCirclesByUserKey,
  // };
  onCardClick = slug => {
    history.push(slug);
  };

  render() {
    const lines = this.props.getCirclesByUserKey || {};
    listCircle.lines = lines;

    return <ComponentController circle={listCircle} />;
  }
}

export default createFragmentContainer(
  GetCirclesByUserKey,
  graphql`
    fragment GetCirclesByUserKey_getCirclesByUserKey on Circle
      @relay(plural: true) {
      id
      _id
      slug
      settings {
        _id
        lines {
          _id
        }
      }
      blob
      type
      title
      subtitle
      description
      string
    }
  `,
);
