import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from './Button';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import PanToolIcon from 'material-ui-icons/PanTool';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import Draggable from 'react-draggable';
import Bar from './Bar';

const styles = theme => ({
  paper: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    margin: 24,
    top: 100,
    right: 300,
    minWidth: 625,
    zIndex: 2000,
    overflow: 'hidden',
    transition: 'height cubic-bezier(0.62, 0.28, 0.23, 0.99) 0.5s',
  },
  header: {
    padding: '12px 12px 12px 12px',
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
    height: '100%',
    width: '100%',
    marginTop: '64px',
    zIndex: 99999,
  },
  headerLeft: {
    flex: 1,
    paddingTop: '8px',
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
    flex: '1 grow',
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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.popup}>
        <Draggable handle="dragHandle" bounds="parent">
          <Paper
            elevation={5}
            className={classes.paper}
            style={
              this.props.contentShowing ? (
                { maxHeight: '600px' }
              ) : (
                { maxHeight: '72px' }
              )
            }
          >
            <dragHandle>
              <Bar className={classes.header}>
                <div className={classes.headerLeft}>
                  <span className={classes.title}>
                    {this.props.dialogTitle ? this.props.dialogTitle : ' '}
                  </span>
                </div>

                <div className={classes.headerRight}>
                  <div className={classes.headerAction}>
                    <IconButton aria-label="Drag" style={{ flex: 1 }}>
                      <PanToolIcon />
                    </IconButton>
                  </div>

                  <div className={classes.headerAction}>
                    {this.props.contentShowing ? (
                      <IconButton
                        onClick={() =>
                          this.props.handleBooleanToggle('contentShowing')}
                      >
                        <KeyboardArrowUp />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() =>
                          this.props.handleBooleanToggle('contentShowing')}
                      >
                        <KeyboardArrowDown />
                      </IconButton>
                    )}
                  </div>
                </div>
              </Bar>
            </dragHandle>
            <div className={classes.content}>{this.props.children}</div>
            <Divider />
            <div className={classes.footer}>
              <div style={{ margin: '0 4px' }}>
                <Button color="primary" onClick={this.props.close}>
                  Cancel
                </Button>
              </div>
              <div style={{ margin: '0 4px' }}>
                <Button raised color="primary" onClick={this.createCircle}>
                  Create
                </Button>
              </div>
            </div>
          </Paper>
        </Draggable>
      </div>
    );
  }
}

DraggablePopUpModule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DraggablePopUpModule);
