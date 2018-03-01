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

import FontIcon from '../FontIcon';
import Button from '../Button';
import TextField from '../TextField';
import Card from '../Card';

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
    onClick: PropTypes.func,
    backgroundSize: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };

  state = {
    showEdit: false,
  };

  handleBooleanToggle = stateName => {
    this.setState({ [stateName]: !this.state[stateName] });
  };

  render() {
    const {
      height,
      backgroundColor,
      width,
      style,
      position,
      containerStyles,
      editing,
      backgroundSize,
      circle,
    } = this.props;

    const src = this.props.src
      ? this.props.src
      : circle.string
        ? circle.string
        : 'https://assets.materialup.com/uploads/dfd29b6d-156d-4043-9a31-6f66c99ad500/material_design_widgets_ui_kit.png';

    const defaults = {
      height: height ? height : circle.styles.height,
      width: width || '100%',
      backgroundColor: backgroundColor || 'none',
      backgroundPosition: position || 'center center',
    };

    const bgSize = backgroundSize
      ? backgroundSize
      : circle.styles.backgroundSize ? circle.styles.backgroundSize : 'contain';

    const important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: bgSize,
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
      <div style={{ width: '100%', height: height, position: 'relative' }}>
        {editing ? (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              color: 'white',
              zIndex: '999',
            }}
          >
            <Button
              color="inherit"
              // size={'small'}
              aria-haspopup="true"
              onClick={() => this.handleBooleanToggle('showEdit')}
            >
              <FontIcon
                style={{ marginLeft: 8 }}
                height={16}
                aria-label="More"
                icon="settings"
              />
            </Button>
            {this.state.showEdit ? (
              <Card
                style={{
                  padding: 8,
                  top: 0,
                  left: this.props.size.width / 4,
                  width: this.props.size.width / 2,
                  position: 'absolute',
                }}
              >
                <TextField
                  id="url"
                  label="Url"
                  style={{}}
                  fullWidth={true}
                  value={circle.string}
                  onChange={this.props.handleStateEventChange('string')}
                />
              </Card>
            ) : null}
          </div>
        ) : null}
        <div
          style={containerStyles}
          onClick={this.props.onClick || (() => {})}
          className={this.props.className || ''}
        >
          {image}
        </div>
      </div>
    );
  }
}

export default Image;
