/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { GetCircleBySlug_getCircleBySlug } from './__generated__/GetCircleBySlug_getCircleBySlug.graphql';
import ContainerBuilder from '../../Mutations/ContainerBuilder';

class GetCircleBySlug extends React.Component {
  props: {
    circle: GetCircleBySlug_getCircleBySlug,
  };

  render() {
    const circle = this.props.getCircleBySlug || {};
    return <ContainerBuilder getCircleBySlug={circle} editing={false} />;
  }
}

export default createFragmentContainer(
  GetCircleBySlug,
  graphql`
    fragment GetCircleBySlug_getCircleBySlug on Circle {
      id
      type
      ui {
        lines {
          type
        }
      }
      string
      blob
      ...ContainerBuilder_getCircleBySlug
    }
  `,
);
