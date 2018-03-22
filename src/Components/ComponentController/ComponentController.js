/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import { graphql, createFragmentContainer } from 'react-relay';
import type { ComponentController_circle } from './__generated__/ComponentController_circle.graphql';

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

class ComponentController extends React.Component {
  static propTypes = {
    // circle is no longer supplied by props, its by
    // circle: PropTypes.node,
  };
  props: {
    circle: ComponentController_circle,
  };
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
        case 'BLOB':
          return (
            <AceEditor
              {...this.props}
              componentSize={this.props.size}
              handleStateStringChange={this.props.handleStateStringChange}
              mode="javascript"
              stateProperty="object"
              defaultState={circle.object}
            />
          );
        case 'BUTTON_LINK':
          return (
            <Button
              raised={circle.boolean}
              color={circle.color}
              style={circle.style}
            >
              {circle.title}
            </Button>
          );
        case 'DIV':
          return <Div {...this.props} />;
        case 'GIF':
          return (
            <Image
              {...this.props}
              componentSize={this.props.size}
              settings={circle.settings}
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
              circle={circle}
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
              defaultState={circle.string}
            />
          );
        case 'VIDEO_YOUTUBE':
          return (
            <YouTube
              {...this.props}
              componentSize={this.props.size}
              type={circle.type}
              videoId={
                circle.string !== '' &&
                circle.string !== null &&
                circle.string !== undefined
                  ? circle.string
                  : 'A4EKZRlpcIM'
              }
            />
          );
        default:
          return (
            <div>
              <Typography type="display3" gutterBottom>
                {circle.title ? circle.title : null}
              </Typography>
              <Typography type="body1" gutterBottom>
                {circle.type}
              </Typography>
              <Typography type="body1" gutterBottom>
                {circle._id}
              </Typography>
              <Typography type="body1" gutterBottom>
                {circle.slug}
              </Typography>
            </div>
          );
      }
    })();
  }
}

// ComponentController.prototype.propTypes = {
//   circle: PropTypes.node,
// };

// export default sizeMe({ monitorHeight: true })(ComponentController);
export default createFragmentContainer(
  sizeMe({ monitorHeight: true })(ComponentController),
  graphql`
    fragment ComponentController_circle on Circle {
      type
      ...Text_circle
      ...LinesContainer_circle
    }
  `,
);
