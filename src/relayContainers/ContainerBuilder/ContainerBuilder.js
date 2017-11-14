/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { ContainerBuilder_getCircleBySlug } from './__generated__/ContainerBuilder_getCircleBySlug.graphql';
import Typography from 'material-ui/Typography';

class ContainerBuilder extends React.Component {
  props: {
    circle: ContainerBuilder_getCircleBySlug,
  };

  render() {
    const circle = this.props.getCircleBySlug || {};
    return (
      <div>
        <Typography type="body2" gutterBottom>
          Title:
          <Typography type="body1" gutterBottom>
            {circle.title}
          </Typography>
        </Typography>
        <Typography type="body2" gutterBottom>
          Type:
          <Typography type="body1" gutterBottom>
            {circle.type}
          </Typography>
        </Typography>
        <Typography type="body2" gutterBottom>
          Id:
          <Typography type="body1" gutterBottom>
            {circle._id}
          </Typography>
        </Typography>
        <Typography type="body2" gutterBottom>
          Slug:
          <Typography type="body1" gutterBottom>
            {circle.slug}
          </Typography>
        </Typography>
        {/* {(() => {
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
              return <div style={{ padding: 24 }}>{circle.type}</div>;
          }
        })()} */}
      </div>
    );
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
    }
  `,
);
