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

const ComponentController = props => {
  return (() => {
    // Only pass in circle, pull type from props.circle.type ONLY
    switch (props.type ? props.type : props.circle.type) {
      case 'BLOB':
        return (
          <AceEditor
            {...props}
            componentSize={props.size}
            handleStateStringChange={props.handleStateStringChange}
            mode="javascript"
            stateProperty="blob"
            defaultState={props.circle.blob}
          />
        );
      case 'BUTTON_LINK':
        return (
          <Button
            raised={props.circle.boolean}
            color={props.circle.color}
            style={props.circle.style}
          >
            {props.circle.title}
          </Button>
        );
      case 'DIV':
        return <Div {...props} />;
      case 'GIF':
        return (
          <Image
            {...props}
            componentSize={props.size}
            settings={props.circle.settings}
            height="400px"
            mode="fit"
            src="https://78.media.tumblr.com/8669c1d0e5a9df130a98066540047988/tumblr_odd1b0Uulu1vp16bjo1_500.gif"
          />
        );
      case 'HEADER':
        return <Header {...props} componentSize={props.size} />;
      case 'HERO':
        return <Hero {...props} />;
      case 'IMAGE':
        return (
          <Image
            {...props}
            editing={props.editing}
            handleStateEventChange={props.handleStateEventChange}
            componentSize={props.size}
          />
        );
      case 'GRID':
        return <List {...props} />;
      case 'LIST_QUERY':
      case 'LINES':
      case 'BLOB_LINES':
        return (
          <Lines
            editing={props.editing}
            circle={props.circle}
            componentController={props.componentController}
          />
        );
      case 'TYPE':
      case 'MEDIA_CARD':
        return (
          <MediaCard
            {...props}
            settings={props.settings}
            selectedCircle={props.selectedCircle ? props.selectedCircle : null}
            handleSingleSelection={
              props.handleSingleSelection ? props.handleSingleSelection : null
            }
          />
        );
      case 'PLAIN_TEXT':
      case 'TEXT':
        return <Text {...props} />;
      case 'STYLES':
        return (
          <AceEditor
            {...props}
            handleStateStringChange={props.handleStateStringChange}
            componentSize={props.size}
            mode="css"
            stateProperty="string"
            defaultState={props.circle.string}
          />
        );
      case 'VIDEO_YOUTUBE':
        return (
          <YouTube
            {...props}
            componentSize={props.size}
            type={props.circle.type}
            videoId={
              props.circle.string !== '' &&
              props.circle.string !== null &&
              props.circle.string !== undefined
                ? props.circle.string
                : 'A4EKZRlpcIM'
            }
          />
        );
      default:
        return (
          <div>
            <Typography type="display3" gutterBottom>
              {props.circle.title ? props.circle.title : null}
            </Typography>
            <Typography type="body1" gutterBottom>
              {props.circle.type}
            </Typography>
            <Typography type="body1" gutterBottom>
              {props.circle._id}
            </Typography>
            <Typography type="body1" gutterBottom>
              {props.circle.slug}
            </Typography>
          </div>
        );
    }
  })();
};

ComponentController.prototype.propTypes = {
  circle: PropTypes.node,
};

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
