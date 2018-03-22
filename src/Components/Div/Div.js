import React from 'react';
import PropTypes from 'prop-types';

const Div = props => {
  return <div style={props.circle.styles} />;
};

Div.prototype.propTypes = {
  style: PropTypes.object,
};

export default Div;
