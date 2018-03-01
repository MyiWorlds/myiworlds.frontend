import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import PanToolIcon from 'material-ui-icons/PanTool';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';

import Draggable from 'react-draggable';

import Bar from '../Bar';
import Button from '../Button';

const style = theme => ({
  paper: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    margin: 24,
    top: 100,
    right: 24,
    width: 425,
    zIndex: 2000,
    overflow: 'hidden',
    transition: 'height cubic-bezier(0.62, 0.28, 0.23, 0.99) 0.5s',
  },
  header: {
    // padding: '12px 12px 12px 12px',
    background: theme.palette.primary.dark,
    display: 'flex',
    flex: '0 0 auto',
    zIndex: 999,
  },
  title: {
    fontFamily: 'Roboto',
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: 500,
    fontSize: '1.5rem',
  },
  flex: {
    flex: 1,
  },
  popup: {
    position: 'fixed',
    pointerEvents: 'none',
    height: '100%',
    width: '100%',
    marginTop: '64px',
    zIndex: 99999,
  },
  headerLeft: {
    flex: 1,
    // paddingTop: '8px',
    overflow: 'hidden',
    marginRight: '8px',
  },
  headerRight: {
    justifyContent: 'flex-end',
    display: 'flex',
  },
  headerAction: {
    flex: 1,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    overflowY: 'auto',
    zIndex: 0,
  },
  footer: {
    display: 'flex',
    flex: '0 0 auto',
    justifyContent: 'flex-end',
    bottom: 0,
    background: '#fbfbfb',
    padding: '12px 20px 12px 0px',
  },
});

class DraggablePopUpModule extends React.Component {
  state = {
    contentShowing: true,
  };

  handleBooleanToggle = stateName => {
    this.setState({ [stateName]: !this.state[stateName] });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.popup}>
        <Draggable handle="dragHandle" bounds="parent">
          <Paper
            elevation={5}
            className={classes.paper}
            style={
              this.state.contentShowing
                ? { maxHeight: '600px', pointerEvents: 'auto' }
                : { maxHeight: '72px', pointerEvents: 'auto' }
            }
          >
            <dragHandle>
              <Bar className={classes.header} dividerBottom={true} padding={0}>
                <div className={classes.headerLeft}>
                  <span className={classes.title}>
                    {this.props.dialogTitle ? this.props.dialogTitle : ' '}
                  </span>
                </div>

                <div className={classes.headerRight}>
                  <div className={classes.headerAction}>
                    {this.state.contentShowing ? (
                      <IconButton
                        onClick={() =>
                          this.handleBooleanToggle('contentShowing')
                        }
                      >
                        <KeyboardArrowUp />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() =>
                          this.handleBooleanToggle('contentShowing')
                        }
                      >
                        <KeyboardArrowDown />
                      </IconButton>
                    )}
                  </div>
                </div>
              </Bar>
            </dragHandle>
            <div className={classes.content}>{this.props.children}</div>
          </Paper>
        </Draggable>
      </div>
    );
  }
}

DraggablePopUpModule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style, { withTheme: true })(DraggablePopUpModule);
