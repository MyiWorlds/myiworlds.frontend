/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { GetCircleBySlug_getCircleBySlug } from './__generated__/GetCircleBySlug_getCircleBySlug.graphql';
import ContainerBuilder from '../ContainerBuilder';

class GetCircleBySlug extends React.Component {
  props: {
    circle: GetCircleBySlug_getCircleBySlug,
  };

  render() {
    const circle = this.props.getCircleBySlug || {};
    return <ContainerBuilder getCircleBySlug={circle} />;
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
      ...ContainerBuilder_getCircleBySlug
    }
  `,
);
