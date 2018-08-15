import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, withStyles, Fade } from '@material-ui/core';
import FontIcon from '../FontIcon';
import { Link } from 'react-router-dom';

const styles = theme => ({
  container: {
    textAlign: 'center',
  },
  btnIcon: {
    marginRight: theme.spacing.unit,
  },
});

class NoMoreResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.timeout = 0;
  }

  componentDidMount() {
    this.timeout = setTimeout(async () => {
      this.setState({ show: true });
    }, 1100);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = 0;
    }
  }

  render() {
    const { classes, user } = this.props;
    const { show } = this.state;

    if (show) {
      return (
        <Fade in={show}>
          <div className={classes.container}>
            <br />
            <br />
            <Typography variant="display1">
              I am sorry {user && user.username ? user.username : 'Human'}, I
              can't find that for you
            </Typography>
            <br />
            <br />
            <Typography variant="headline">
              Would you be interested in creating it?
            </Typography>
            <br />
            <br />
            <Button variant="raised" component={Link} to="/create">
              <FontIcon className={classes.btnIcon}>add</FontIcon>
              Create
            </Button>
            <br />
            <br />
          </div>
        </Fade>
      );
    } else {
      return null;
    }
  }
}

NoMoreResults.protoTypes = {
  user: PropTypes.object,
};

export default withStyles(styles)(NoMoreResults);
