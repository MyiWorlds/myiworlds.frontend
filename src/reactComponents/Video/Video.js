import React from 'react';
import PropTypes from 'prop-types';
import YouTube from './YouTube';
import injectSheet from 'react-jss';
import Header from '../Header';

const circle = {
  settings: {},
  styles: {
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

const styles = {
  containerStyles: {
    position: 'relative',
    height: props => 9 / 16 * props.componentSize.width,
    maxHeight: '80vh',
  },
  videoWrapper: {
    margin: '0 auto',
    height: '100%',
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
    <Header componentSize={props.componentSize} circle={props.circle} />
  );
  const video = (
    <div
      key="video"
      style={circle.styles.containerStyles}
      className={classes.containerStyles}
    >
      <div className={classes.videoWrapper}>
        {(() => {
          switch (props.type) {
            case 'VIDEO_YOUTUBE':
              return (
                <YouTube
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

  return <div>{props.headerBot ? [header, video] : [video, header]}</div>;
};

Video.prototype.propTypes = {
  videoId: PropTypes.string,
  circle: PropTypes.object,
};

export default injectSheet(styles)(Video);
