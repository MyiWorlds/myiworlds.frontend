/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { UpdateCircle_circle } from './__generated__/UpdateCircle_circle.graphql';
import type { UpdateCircle_user } from './__generated__/UpdateCircle_user.graphql';

import UpdateCircleMutation from './UpdateCircleMutation';
import DeleteCircleMutation from '../DeleteCircle/DeleteCircleMutation';

// import ComponentController from '../../Components/ComponentController';
import CircleController from '../CircleController';

class UpdateCircle extends React.Component {
  props: {
    circle: UpdateCircle_circle,
    user: UpdateCircle_user,
  };

  render() {
    return (
      <CircleController
        {...this.props}
        editing={true}
        relayEnvironment={this.props.relay.environment}
        updateCircleMutation={UpdateCircleMutation}
        deleteCircleMutation={DeleteCircleMutation}
        user={this.props.user}
        circle={this.props.circle}
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

    fragment UpdateCircle_circle on Circle {
      ...ComponentController_circle
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
        string
        object
      }
      rating {
        _id
      }
      styles {
        _id
        string
        object
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
      object
      number
      boolean
      date
      geoPoint
      line {
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
