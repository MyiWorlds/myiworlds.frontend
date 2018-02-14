/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { UpdateCircle_getCircleByKey } from './__generated__/UpdateCircle_getCircleByKey.graphql';
import type { UpdateCircle_user } from './__generated__/UpdateCircle_user.graphql';

import UpdateCircleMutation from './UpdateCircleMutation';
import DeleteCircleMutation from '../DeleteCircle/DeleteCircleMutation';

import CircleController from '../CircleController';

class UpdateCircle extends React.Component {
  props: {
    circle: UpdateCircle_getCircleByKey,
    user: UpdateCircle_user,
  };

  render() {
    return (
      <CircleController
        editing={true}
        relayEnvironment={this.props.relay.environment}
        updateCircleMutation={UpdateCircleMutation}
        deleteCircleMutation={DeleteCircleMutation}
        user={this.props.user}
        circle={this.props.getCircleByKey}
      />
    );
  }
}

export default createFragmentContainer(
  UpdateCircle,
  graphql`
    fragment UpdateCircle_user on User {
      id
      _id
      username
    }

    fragment UpdateCircle_getCircleByKey on Circle {
      id
      _id
      ui {
        _id
      }
      slug
      slugName
      public
      passwordRequired
      type
      settings {
        _id
      }
      rating {
        _id
      }
      styles {
        _id
      }
      tags
      title
      subtitle
      description
      media {
        _id
      }
      icon {
        _id
      }
      viewers {
        _id
      }
      creator {
        _id
        username
      }
      editors {
        _id
      }
      dateCreated
      dateUpdated
      string
      blob
      number
      boolean
      date
      geoPoint
      line {
        _id
      }
      lines {
        _id
      }
      linesMany {
        edges {
          node {
            _id
          }
        }
      }
    }
  `,
);
