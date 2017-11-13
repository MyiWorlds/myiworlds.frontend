/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import { graphql, createFragmentContainer } from 'react-relay';
import type { ContainerBuilder_getCircleBySlug } from './__generated__/ContainerBuilder_getCircleBySlug.graphql';

class ContainerBuilder extends React.Component {
  props: {
    circle: ContainerBuilder_getCircleBySlug,
  };

  render() {
    const circle = this.props.getCircleBySlug || {};
    return (
      <div>
        {window.location.hostname}
        {console.log(this.props)}
        {(() => {
          switch (circle.type) {
            case 'HEADER':
              return <div />;
            case 'IMAGE':
              return <div />;
            case 'PLAIN_TEXT':
              return <div />;
            case 'PAGE':
              return <div />;
            default:
              return <div>{circle.type}</div>;
          }
        })()}
      </div>
    );
  }
}

export default createFragmentContainer(
  ContainerBuilder,
  graphql`
    fragment ContainerBuilder_getCircleBySlug on Circle {
      type
    }
  `,
);
