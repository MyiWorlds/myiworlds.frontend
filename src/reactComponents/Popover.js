import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';

const style = theme => ({
  paper: {
    padding: theme.spacing.unit,
  },
  popover: {
    pointerEvents: 'none',
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class Popover extends React.Component {
  state = {
    anchorEl: null,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    const open = !!anchorEl;
    return [
      <div
        onMouseOver={this.handlePopoverOpen}
        onMouseOut={this.handlePopoverClose}
      >
        {this.props.children}
      </div>,
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={this.handlePopoverClose}
      >
        {this.props.popoverContent}
      </Popover>,
    ];
  }
}

Popover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style, { withTheme: true })(Popover);
