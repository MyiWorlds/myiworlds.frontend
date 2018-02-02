/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { ContainerBuilder_getCircleBySlug } from './__generated__/ContainerBuilder_getCircleBySlug.graphql';
import ComponentController from '../../reactComponents/ComponentController';

class ContainerBuilder extends React.Component {
  props: {
    circle: ContainerBuilder_getCircleBySlug,
  };

  render() {
    const circle = this.props.getCircleBySlug || {};
    return <ComponentController circle={circle} />;
  }
}

export default createFragmentContainer(
  ContainerBuilder,
  graphql`
    fragment ContainerBuilder_getCircleBySlug on Circle {
      id
      _id
      title
      slug
      type
      tags
      string
    }
  `,
);
