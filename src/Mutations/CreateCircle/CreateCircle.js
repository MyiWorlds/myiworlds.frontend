/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { CreateCircle_user } from './__generated__/CreateCircle_user.graphql';

import CreateCircleMutation from './CreateCircleMutation';

import CircleController from '../CircleController/CircleController';

class CreateCircle extends React.Component {
  props: {
    user: CreateCircle_user,
  };

  render() {
    return (
      <CircleController
        editing={true}
        user={this.props.user}
        relayEnvironment={this.props.relay.environment}
        createCircleMutation={CreateCircleMutation}
      />
    );
  }
}

export default createFragmentContainer(
  CreateCircle,
  graphql`
    fragment CreateCircle_user on User {
      id
      _id
      username
    }
  `,
);
