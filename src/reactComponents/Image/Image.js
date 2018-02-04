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
    height: PropTypes.string,
    backgroundColor: PropTypes.string,
    width: PropTypes.string,
    style: PropTypes.object,
    containerStyles: PropTypes.object,
    position: PropTypes.string,
    mode: PropTypes.string,
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
    const src =
      this.props.circle.string ||
      'https://assets.materialup.com/uploads/dfd29b6d-156d-4043-9a31-6f66c99ad500/material_design_widgets_ui_kit.png';
    const mode =
      this.props.circle.settings && this.props.circle.settings.mode
        ? this.props.circle.settings.mode
        : 'fit';

    const modes = {
      fill: 'cover',
      fit: 'contain',
    };
    const size = modes[mode] || 'cover';

    const defaults = {
      height: height || '400px',
      width: width || '100%',
      backgroundColor: backgroundColor || 'none',
      backgroundPosition: position || 'center center',
    };

    const important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: size,
      backgroundRepeat: 'no-repeat',
    };

    const header = (
      <Header
        componentSize={this.props.componentSize}
        circle={this.props.circle}
      />
    );

    return (
      <div style={containerStyles}>
        <div
          title={this.props.title}
          style={{ ...defaults, ...style, ...important }}
        />
        {header}
      </div>
    );
  }
}

export default Image;
