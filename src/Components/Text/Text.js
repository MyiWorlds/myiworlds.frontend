import React from 'react';
import PropTypes from 'prop-types';

import { graphql, createFragmentContainer } from 'react-relay';
import type { Text_circle } from './__generated__/Text_circle.graphql';

import Typography from '../Typography';
import TextEditor from './TextEditor';

import textDefault from './textDefault';

const Text = props => {
  const { circleState, handleStateEventChange } = props;

  let circle = {};
  if (props.circle) {
    circle = props.circle;
  } else if (props.circleState) {
    circle = props.circleState;
  }

  let styles = {};
  if (props.styles) {
    styles = props.styes;
  } else if (circle && circle.styles) {
    styles = circle.styles;
  } else {
    styles = textDefault.styles;
  }

  const textEditor = (
    <TextEditor
      circleState={circleState}
      handleStateEventChange={handleStateEventChange}
    />
  );

  const text = (
    <Typography
      style={styles.string}
      type={
        circle && circle.settings && circle.settings.textType
          ? circle.settings.textType
          : 'body1'
      }
    >
      {circle.string}
    </Typography>
  );

  return (
    <div style={styles.container}>{props.editing ? textEditor : text}</div>
  );
};

Text.prototype.propTypes = {
  circle: PropTypes.obj,
  circleState: PropTypes.obj,
};

Text.prototype.defaultProps = {
  circle: {},
  circleState: {},
  handleStateEventChange: () => {},
};

export default createFragmentContainer(
  Text,
  graphql`
    fragment Text_circle on Circle {
      styles {
        string
        object
      }
      string
    }
  `,
);
