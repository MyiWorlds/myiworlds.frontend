/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { GetCircleBySlug_getCircleBySlug } from './__generated__/GetCircleBySlug_getCircleBySlug.graphql';

// import LinesContainer from '../../Components/Lines/LinesContainer';
import ComponentController from '../../Components/ComponentController';

class GetCircleBySlug extends React.Component {
  props: {
    circle: GetCircleBySlug_getCircleBySlug,
  };

  render() {
    let circle = this.props.getCircleBySlug || {};
    return <ComponentController circle={circle} editing={false} />;
  }
}

export default createFragmentContainer(
  GetCircleBySlug,
  graphql`
    fragment GetCircleBySlug_getCircleBySlug on Circle {
      # ...LinesContainer_getCircleBySlug
      ...ComponentController_circle
    }
  `,
);
