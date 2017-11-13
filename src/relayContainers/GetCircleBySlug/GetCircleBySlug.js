/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { GetCircleBySlug_getCircleBySlug } from './__generated__/GetCircleBySlug_getCircleBySlug.graphql';
import ContainerBuilder from '../ContainerBuilder';
import AccountBar from '../../reactComponents/AccountBar';
import Navigation from '../../reactComponents/Navigation';
import Actions from '../../reactComponents/Actions';

class GetCircleBySlug extends React.Component {
  props: {
    circle: GetCircleBySlug_getCircleBySlug,
  };

  render() {
    const circle = this.props.getCircleBySlug || {};
    return (
      <div>
        <AccountBar />
        <Navigation />
        <ContainerBuilder getCircleBySlug={circle} />
        <Actions actions={['createUser']} />
      </div>
    );
  }
}

export default createFragmentContainer(
  GetCircleBySlug,
  graphql`
    fragment GetCircleBySlug_getCircleBySlug on Circle {
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
