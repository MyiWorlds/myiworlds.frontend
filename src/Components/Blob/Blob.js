/* @flow */

import React from 'react';
// import { withStyles } from 'material-ui/styles';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import AceEditor from '../AceEditor';

const style = theme => ({
  container: {
    width: '100%',
    display: 'inline-block',
  },
});

const Blob = props => {
  return props.editing ? (
    <AceEditor
      handleStateStringChange={props.handleStateStringChange}
      circle={props.circle}
    />
  ) : (
    <span>{props.circle.blob}</span>
  );
};

Blob.prototype.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
};

export default injectSheet(style, { withTheme: true })(Blob);
