/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import AppBar from '../../../Components/AppBar';

class CircleComponentSwitch extends React.Component {
  static propTypes = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      return true;
    }
  }

  render() {
    let circle = {};
    if (this.props.circleProps) {
      circle = this.props.circleProps;
    } else if (this.props.circleState) {
      circle = this.props.circleState;
    } else {
      circle = this.props.circle;
    }

    let type = '';
    if (this.props.type) {
      type = this.props.type;
    } else {
      type = circle.type;
    }

    return (() => {
      switch (type) {
        case 'APP_BAR':
          return <AppBar {...this.props} />;
        default:
          return (
            <div>
              <h1>{circle.title ? circle.title : null}</h1>
              <p>{circle.type}</p>
              <p>{circle.uid}</p>
              <p>{circle.slug}</p>
            </div>
          );
      }
    })();
  }
}
export default sizeMe({ monitorHeight: true })(CircleComponentSwitch);
