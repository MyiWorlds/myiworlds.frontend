/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import Image from '../Image';
import YouTube from '../Video/YouTube';
import Typography from '../Typography';
import Header from '../Header';
import PlainText from '../PlainText';
import MediaCard from '../MediaCard';
import Blob from '../Blob';

const ComponentController = props => {
  return (() => {
    switch (props.type ? props.type : props.circle.type) {
      case 'IMAGE':
        return <Image {...props} componentSize={props.size} />;
      case 'HEADER':
        return <Header {...props} componentSize={props.size} />;
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
      case 'BLOB':
        return <Blob {...props} componentSize={props.size} />;
      case 'HERO':
        return <div>HERO</div>;
      case 'PLAIN_TEXT':
        return <PlainText {...props} />;
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
