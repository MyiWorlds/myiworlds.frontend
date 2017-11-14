/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  content: {
    width: '100%',
    zIndex: 1,
    flexGrow: 1,
    padding: 24,
    marginLeft: 0,
    marginTop: 64,
    height: 'calc(100% - 56px)',
    top: 56,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 240,
      top: 64,
      height: 'calc(100% - 64px)',
    },
  },
});

class Content extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <Paper style={{ margin: '0 auto' }} elevation={2}>
          {this.props.children}
        </Paper>
      </main>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  navOpen: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(Content);
