/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

class Image extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,
    backgroundColor: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    containerStyles: PropTypes.object,
    position: PropTypes.string,
    mode: PropTypes.string,
    onClick: PropTypes.func,
    imageSize: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };

  render() {
    const {
      height,
      backgroundColor,
      width,
      style,
      position,
      containerStyles,
    } = this.props;

    const src = this.props.src
      ? this.props.src
      : this.props.circle.string
        ? this.props.circle.string
        : 'https://assets.materialup.com/uploads/dfd29b6d-156d-4043-9a31-6f66c99ad500/material_design_widgets_ui_kit.png';

    const defaults = {
      height: height || '400px',
      width: width || '100%',
      backgroundColor: backgroundColor || 'none',
      backgroundPosition: position || 'center center',
    };

    const important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: this.props.imageSize ? this.props.imageSize : 'contain',
      backgroundRepeat: 'no-repeat',
    };

    const image = (
      <div
        key="image"
        title={this.props.title}
        style={{ ...defaults, ...style, ...important }}
        onMouseEnter={
          this.props.onMouseEnter ? this.props.onMouseEnter : () => {}
        }
        onMouseLeave={
          this.props.onMouseLeave ? this.props.onMouseLeave : () => {}
        }
      />
    );

    return (
      <div
        style={
          this.props.height
            ? { height: this.props.height, position: 'relative' }
            : containerStyles
        }
        onClick={this.props.onClick || (() => {})}
        className={this.props.className || ''}
      >
        {image}
      </div>
    );
  }
}

export default Image;
