/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import Video from '../Video';
import sizeMe from 'react-sizeme';
import Typography from '../Typography';
import Header from '../Header';
import PlainText from '../PlainText';
import MediaCard from '../MediaCard';

const ComponentController = props => {
  return (() => {
    switch (props.type ? props.type : props.circle.type) {
      case 'IMAGE':
        return <Image componentSize={props.size} circle={props.circle} />;
      case 'HEADER':
        return <Header componentSize={props.size} circle={props.circle} />;
      case 'GIF':
        return (
          <Image
            componentSize={props.size}
            height="400px"
            mode="fit"
            src="https://78.media.tumblr.com/8669c1d0e5a9df130a98066540047988/tumblr_odd1b0Uulu1vp16bjo1_500.gif"
          />
        );
      case 'VIDEO_HTML':
      case 'VIDEO_YOUTUBE':
        return (
          <Video
            componentSize={props.size}
            circle={props.circle}
            type={props.circle.type}
            {...props}
          />
        );
      case 'HERO':
        return <div>HERO</div>;
      case 'PLAIN_TEXT':
        return <PlainText circle={props.circle} />;
      case 'MEDIA_CARD':
        return (
          <MediaCard
            circle={props.circle}
            {...props}
            settings={props.settings}
            selectedCircle={props.selectedCircle ? props.selectedCircle : null}
            handleSingleSelection={
              props.handleSingleSelection ? props.handleSingleSelection : null
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

export default sizeMe({ monitorHeight: true })(ComponentController);
