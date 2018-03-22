/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import { graphql, createFragmentContainer } from 'react-relay';
import type { Circle_circle } from './__generated__/Circle_circle.graphql';

import Header from '../Header';
import ComponentContoller from '../ComponentContoller';

// NOTE: Div can be flexbox and you can just choose if
// you want header above or below its just a style prop
class Circle extends React.Component {
  props: {
    circle: Circle_circle,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      return true;
    }
  }

  render() {
    return (
      <div>
        <Header />
        <ComponentContoller />
      </div>
    );
  }
}

export default createFragmentContainer(
  sizeMe({ monitorHeight: true })(Circle),
  graphql`
    fragment Circle_container on Circle {
      settings {
        string
        object
      }
      styles {
        string
        object
      }
    }
  `,
);
