import React from 'react';
import PropTypes from 'prop-types';

const NotFound = props => {
  return (
    <div>
      <h1>Ruh Row</h1>
      <h5>That page was not found.</h5>
      <p>Try searching for another page</p>
    </div>
  );
};

NotFound.prototype.propTypes = {};

export default NotFound;
