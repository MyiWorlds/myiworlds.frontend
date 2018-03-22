import React from 'react';
import PropTypes from 'prop-types';

import { graphql, createFragmentContainer } from 'react-relay';
import type { LinesContainer_circle } from './__generated__/LinesContainer_circle.graphql';

import ComponentController from '../ComponentController';

class LinesContainer extends React.Component {
  props: {
    circle: LinesContainer_circle,
  };

  render() {
    const lines = this.props.circle.lines;
    const listType =
      this.props.circle.settings && this.props.circle.settings.listType
        ? this.props.circle.settings.listType
        : null;

    const linesEditor = (
      <div style={this.props.circle.styles ? this.props.circle.styles : {}}>
        {lines.map((circle, index) => {
          return (
            <ComponentController
              // {...this.props}
              key={circle._id}
              circle={circle}
              type={listType}
            />
          );
        })}
        <div>
          <div>Add</div>
          <div>Remove</div>
          <div>Reorder</div>
        </div>
      </div>
    );

    const linesDisplay = (
      <div style={this.props.circle.styles ? this.props.circle.styles : {}}>
        {lines.map((circle, index) => {
          return (
            <ComponentController
              // {...this.props}
              key={circle._id + index}
              circle={circle}
              type={listType}
            />
          );
        })}
      </div>
    );

    return this.props.editing ? linesEditor : linesDisplay;
  }
}

LinesContainer.prototype.propTypes = {
  circle: PropTypes.object,
};

// export default LinesContainer;
export default createFragmentContainer(
  LinesContainer,
  graphql`
    fragment LinesContainer_circle on Circle {
      id
      _id
      slug
      public
      settings {
        string
        object
      }
      styles {
        string
        object
      }
      object
      type
      title
      subtitle
      description
      string
      lines {
        _id
        id
        title
      }
    }
  `,
);
