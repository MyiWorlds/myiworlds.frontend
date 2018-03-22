/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import Image from '../Image';
import YouTube from '../Video/YouTube';
import Typography from '../Typography';
import Header from '../Header';
import Text from '../Text';
import MediaCard from '../MediaCard';
import AceEditor from '../AceEditor';
import Hero from '../Hero';
import Lines from '../Lines';
import Div from '../Div';
import Button from '../Button';
import { List } from '../List';

class ComponentEditorController extends React.Component {
  // props: {
  //   circle: ComponentController_circle,
  // };
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      return true;
    }
  }

  render() {
    let type = '';
    if (this.props.type) {
      type = this.props.type;
    } else {
      type = this.props.circle.type;
    }

    return (() => {
      switch (type) {
        case 'BLOB':
          return (
            <AceEditor
              {...this.props}
              componentSize={this.props.size}
              handleStateStringChange={this.props.handleStateStringChange}
              mode="javascript"
              stateProperty="object"
              defaultState={this.props.circle.object}
            />
          );
        case 'BUTTON_LINK':
          return (
            <Button
              raised={this.props.circle.boolean}
              color={this.props.circle.color}
              style={this.props.circle.style}
            >
              {this.props.circle.title}
            </Button>
          );
        case 'DIV':
          return <Div {...this.props} />;
        case 'GIF':
          return (
            <Image
              {...this.props}
              componentSize={this.props.size}
              settings={this.props.circle.settings}
              height="400px"
              mode="fit"
              src="https://78.media.tumblr.com/8669c1d0e5a9df130a98066540047988/tumblr_odd1b0Uulu1vp16bjo1_500.gif"
            />
          );
        case 'HEADER':
          return <Header {...this.props} componentSize={this.props.size} />;
        case 'HERO':
          return <Hero {...this.props} />;
        case 'IMAGE':
          return (
            <Image
              {...this.props}
              editing={this.props.editing}
              handleStateEventChange={this.props.handleStateEventChange}
              componentSize={this.props.size}
            />
          );
        case 'GRID':
          return <List {...this.props} />;
        case 'LIST_QUERY':
        case 'LINES':
        case 'BLOB_LINES':
          return (
            <Lines
              editing={this.props.editing}
              circle={this.props.circle}
              componentController={this.props.componentController}
            />
          );
        case 'TYPE':
        case 'MEDIA_CARD':
          return (
            <MediaCard
              {...this.props}
              settings={this.props.settings}
              selectedCircle={
                this.props.selectedCircle ? this.props.selectedCircle : null
              }
              handleSingleSelection={
                this.props.handleSingleSelection
                  ? this.props.handleSingleSelection
                  : null
              }
            />
          );
        case 'PLAIN_TEXT':
        case 'TEXT':
          return <Text {...this.props} />;
        case 'STYLES':
          return (
            <AceEditor
              {...this.props}
              handleStateStringChange={this.props.handleStateStringChange}
              componentSize={this.props.size}
              mode="css"
              stateProperty="string"
              defaultState={this.props.circle.string}
            />
          );
        case 'VIDEO_YOUTUBE':
          return (
            <YouTube
              {...this.props}
              componentSize={this.props.size}
              type={this.props.circle.type}
              videoId={
                this.props.circle.string !== '' &&
                this.props.circle.string !== null &&
                this.props.circle.string !== undefined
                  ? this.props.circle.string
                  : 'A4EKZRlpcIM'
              }
            />
          );
        default:
          return null;
      }
    })();
  }
}

export default sizeMe({ monitorHeight: true })(ComponentEditorController);
