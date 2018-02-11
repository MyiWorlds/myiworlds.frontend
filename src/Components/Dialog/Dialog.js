import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from '../Button';
import Divider from '../Divider';
import Bar from '../Bar';
import MUIDialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

const style = theme => ({
  header: {
    padding: '12px 12px 12px 12px',
    background: theme.palette.primary.dark,
    display: 'flex',
    flex: '0 0 auto',
  },
  title: {
    fontFamily: 'Roboto',
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: 500,
    fontSize: '1.5rem',
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
    position: 'relative',
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
  actionItems: {
    margin: '0px 4px',
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Dialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleCancel: PropTypes.func,
    handleSuccess: PropTypes.func,
    cancelText: PropTypes.string,
    successText: PropTypes.string,
  };

  render() {
    const { classes } = this.props;
    return (
      <MUIDialog
        open={this.props.open}
        keepMounted
        onBackdropClick={this.props.handleCancel}
        maxWidth="md"
        transition={Transition}
        aria-labelledby="responsive-dialog-title"
        style={{ zIndex: '9999' }}
      >
        <Bar className={classes.header} dividerBottom={true}>
          <div className={classes.headerLeft}>
            <span id="responsive-dialog-title" className={classes.title}>
              {this.props.dialogTitle ? this.props.dialogTitle : ' '}
            </span>
          </div>
        </Bar>
        <div className={classes.content}>{this.props.children}</div>
        <Divider />
        <div className={classes.footer}>
          <div className={classes.actionItems}>
            <Button
              color={this.props.cancelColor || 'primary'}
              onClick={this.props.handleCancel}
            >
              {this.props.cancelText}
            </Button>
          </div>
          <div className={classes.actionItems}>
            <Button
              disabled={this.props.disablePrimary}
              raised
              color={this.props.successColor || 'primary'}
              onClick={this.props.handleSuccess}
            >
              {this.props.successText}
            </Button>
          </div>
        </div>
      </MUIDialog>
    );
  }
}

export default withStyles(style, { withTheme: true })(Dialog);
