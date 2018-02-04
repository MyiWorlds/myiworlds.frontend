import React from 'react';
import PropTypes from 'prop-types';
import ReactYouTube from 'react-youtube';

const opts = {
  width: '100%',
  height: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    // autoplay: 0,
  },
};

// Use youtube api and thumbnails
const YouTube = props => {
  return <ReactYouTube videoId={props.videoId} opts={opts} />;
};

YouTube.prototype.propTypes = {
  videoId: PropTypes.string,
};

export default YouTube;
