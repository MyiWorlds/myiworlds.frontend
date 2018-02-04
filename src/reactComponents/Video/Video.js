import React from 'react';
import PropTypes from 'prop-types';
import YouTube from './YouTube';
import injectSheet from 'react-jss';
import Header from '../Header';

const circle = {
  id: 'defaultvideo',
  settings: {},
  style: {
    containerStyles: {
      // width: '100%',
      background: '#000',
      // height: '100px',
      // position: 'props.relativcomeponentSize.height - 185',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      // background: 'black',
      // width: '100%',
      // height: 500,
    },
    videoWrapper: {
      // width: '100%',
      // height: '100%',
      // margin: 0,
      // position: 'relative',
      // paddingBottom: '56.25%' /* 16:9 */,
      // paddingTop: '25px',
      // height: 0,
      // overflow: 'hidden',
      // $span: {},
    },
  },
};

const style = {
  containerStyles: {
    position: 'relative',
    height: props =>
      props.style && props.style.height
        ? props.style.height
        : 9 / 16 * props.componentSize.width,
    width: props =>
      props.style && props.style.width ? props.style.width : '100%',
    maxHeight: '80vh',
  },
  videoWrapper: {
    margin: '0 auto',
    height: props =>
      props.style && props.style.height ? props.style.height : '100%',
    maxWidth: props =>
      props.componentSize.width < 1000
        ? '100%'
        : props.componentSize.width -
          props.componentSize.width / props.componentSize.height * 100,
  },
};

const Video = props => {
  const { classes } = props;
  const header = (
    <Header
      key="header"
      componentSize={props.componentSize}
      circle={props.circle}
    />
  );

  const video = (
    <div
      key={circle.id}
      style={circle.style.containerStyles}
      className={classes.containerStyles}
    >
      <div className={classes.videoWrapper}>
        {(() => {
          switch (props.type || props.circle.type) {
            case 'VIDEO_YOUTUBE':
              return (
                <YouTube
                  key={props.circle.id}
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
              return null;
          }
        })()}
      </div>
    </div>
  );

  return (
    <div>
      {props.hideHeader
        ? video
        : props.headerBot ? [header, video] : [video, header]}
    </div>
  );
};

Video.prototype.propTypes = {
  videoId: PropTypes.string,
  circle: PropTypes.object,
};

export default injectSheet(style)(Video);
