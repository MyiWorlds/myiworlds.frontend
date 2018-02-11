import React from 'react';
import PropTypes from 'prop-types';
import ReactYouTube from 'react-youtube';
import toggleKeyValueBoolean from '../../../functions/updateKeyValues/toggleKeyValueBoolean';
import Image from '../../Image/Image';
import LoadingIndicator from '../../LoadingIndicator';
import injectSheet from 'react-jss';
import getComponentSize from '../../../functions/getComponentSize';
import sizeMe from 'react-sizeme';

const opts = {
  width: '100%',
  height: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const style = props => ({
  containerStyles: {
    position: 'relative',
    height: '100%',
    maxHeight: '80vh',
  },
  videoWrapper: {
    margin: '0 auto',
    height: props =>
      props.style && props.style.height ? props.style.height : '100%',
  },
  thumbnail: {
    position: 'absolute',
    top: 0,
    left: 0,
    minHeight: '100%',
    minWidth: '100%',
    cursor: 'pointer',
  },
  youtubeIconContainer: {
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  youtubeIconWrapper: {
    width: props => props.componentSize.width / 5,
    height: props => props.componentSize.width / 5,
  },
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
    // Minus its padding
    width: props => props.componentSize.width - 16,
    overflow: 'hidden',
    fontSize: 14,
    color: 'white',
    fontFamily: 'Roboto',
    background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.05))',
  },
  duration: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 8,
    background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7))',
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto',
  },
});

class YouTube extends React.Component {
  static PropTypes = {
    videoId: PropTypes.string,
  };

  state = {
    loading: true,
    showVideo: false,
    hoverThumbnail: false,
    title: null,
    duration: '',
    thumbnails: {
      standard: {
        url:
          'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg',
      },
    },
  };

  componentWillMount() {
    this.getYoutubeVideoThumbnails(this.props.videoId);
  }

  // Need to rerender when videoId changes
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.videoId !== this.props.videoId) {
  //     this.getYoutubeVideoThumbnails(this.props.videoId);
  //   }
  // }

  getYoutubeVideoThumbnails = async videoId => {
    const YOUR_API_KEY = process.env.REACT_APP_YOUR_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2C+snippet&id=${videoId}&fields=items(contentDetails%2Fduration%2Csnippet(thumbnails%2Ctitle))&key=${YOUR_API_KEY}`;

    try {
      return await fetch(url)
        .then(response => response.json())
        .then(response => response.items[0])
        .then(response => {
          this.setState({
            loading: false,
            title: response.snippet.title,
            thumbnails: response.snippet.thumbnails,
            duration: response.contentDetails.duration,
          });
        });
    } catch (error) {
      return console.log(error);
    }
  };

  showVideo = name => () => {
    this.setState(toggleKeyValueBoolean(name, this.state[name]));
  };

  // getComponentSize(
  //   this.props.componentSize.width,
  //   listSettings.settings.appBar.cardSizes,
  // );

  // Converts the ISO 8601 returned from YouTube API to Hr:Min:Sec
  convertTime = duration => {
    const array = duration.match(/(\d+)(?=[MHS])/gi) || [];

    const formatted = array
      .map(function(item) {
        if (item.length < 2) return '0' + item;
        return item;
      })
      .join(':');

    return formatted;
  };

  onThumbnailHover = () => {
    this.setState({ hoverThumbnail: true });
  };

  onThumbnailLeave = () => {
    this.setState({ hoverThumbnail: false });
  };

  render() {
    const { classes } = this.props;
    const thumbnail = (
      <div onClick={this.showVideo('showVideo')}>
        <Image
          className={classes.thumbnail}
          height={this.props.componentSize.height}
          width={'100%'}
          src={this.state.thumbnails.standard.url}
          hideHeader={true}
          imageSize={'cover'}
          onMouseEnter={this.onThumbnailHover}
          onMouseLeave={this.onThumbnailLeave}
        />

        <div
          onMouseEnter={this.onThumbnailHover}
          onMouseLeave={this.onThumbnailLeave}
        >
          <div className={classes.title}>
            {this.state.title ? this.state.title : ''}
          </div>
          <div className={classes.duration}>
            {this.state.duration ? this.convertTime(this.state.duration) : ''}
          </div>
        </div>

        <div
          className={classes.youtubeIconContainer}
          onMouseEnter={this.onThumbnailHover}
          onMouseLeave={this.onThumbnailLeave}
        >
          <div className={classes.youtubeIconWrapper}>
            <svg
              preserveAspectRatio="xMinYMid slice"
              viewBox="0 0 50 50"
              width="100%"
            >
              <path
                style={{
                  fill: this.state.hoverThumbnail
                    ? '#FF3D00'
                    : 'rgba(0, 0, 0, 0.5)',
                }}
                d="M 43.199219 33.898438 C 42.800781 36 41.101563 37.601563 39 37.898438 C 35.699219 38.398438 30.199219 39 24 39 C 17.898438 39 12.398438 38.398438 9 37.898438 C 6.898438 37.601563 5.199219 36 4.800781 33.898438 C 4.398438 31.601563 4 28.199219 4 24 C 4 19.800781 4.398438 16.398438 4.800781 14.101563 C 5.199219 12 6.898438 10.398438 9 10.101563 C 12.300781 9.601563 17.800781 9 24 9 C 30.199219 9 35.601563 9.601563 39 10.101563 C 41.101563 10.398438 42.800781 12 43.199219 14.101563 C 43.601563 16.398438 44.101563 19.800781 44.101563 24 C 44 28.199219 43.601563 31.601563 43.199219 33.898438 Z "
              />
              <path
                style={{
                  fill: '#FFFFFF',
                }}
                d="M 20 31 L 20 17 L 32 24 Z "
              />
            </svg>
          </div>
        </div>
      </div>
    );
    const video = <ReactYouTube videoId={this.props.videoId} opts={opts} />;

    return (
      <div className={classes.containerStyles}>
        <div className={classes.videoWrapper}>
          {this.state.loading ? (
            <LoadingIndicator />
          ) : this.state.showVideo ? (
            video
          ) : (
            thumbnail
          )}
          <div />
        </div>
      </div>
    );
  }
}

export default injectSheet(style)(sizeMe({ monitorHeight: true })(YouTube));
