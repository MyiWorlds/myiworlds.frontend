/* @flow */

import React from 'react';
// import { withStyles } from 'material-ui/styles';
import injectSheet from 'react-jss';
import Divider from '../Divider';
import PropTypes from 'prop-types';

const style = theme => ({
  header: {
    padding: props => props.padding || '12px',
    background: props => props.background || theme.palette.background.default,
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: props => props.flexDirection || 'row',
    zIndex: 999,
    alignItems: 'center',
  },
});

const Bar = props => {
  return (
    <div style={props.containerStyles || {}}>
      {props.dividerTop ? <Divider /> : null}
      <div
        style={props.style}
        className={(props.className, props.classes.header)}
      >
        {props.children}
      </div>
      {props.dividerBottom ? <Divider /> : null}
    </div>
  );
};

Bar.prototype.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  dividerTop: PropTypes.bool,
  dividerBottom: PropTypes.bool,
};

export default injectSheet(style, { withTheme: true })(Bar);
