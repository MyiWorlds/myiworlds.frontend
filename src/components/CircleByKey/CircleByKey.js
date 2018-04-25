import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import { filter } from 'graphql-anywhere';

import GET_CIRCLE_BY_KEY from '../../queries/root/getCircleByKey';
import DeleteCircle from '../../mutations/DeleteCircle';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';

import FontIcon from '../FontIcon';
import Progress from '../Progress';
import NotFound from '../NotFound';
import Description from './Description';
import Lines from './Lines';

const styles = theme => ({
  marginRight: {
    marginRight: theme.spacing.unit,
  },
});

class CircleByKey extends React.Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
  };

  state = {
    bool: false,
  };

  deleteCircle = () => {};
  render() {
    const { classes, user } = this.props;

    return (
      <Query
        query={GET_CIRCLE_BY_KEY}
        variables={{ uid: this.props.uid }}
        skip={!this.props.location.pathname}
        notifyOnNetworkStatusChange
      >
        {({ loading, error, data, refetch, networkStatus }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${error}`</p>;

          const circle = data.getCircleByKey;
          if (!circle) return <NotFound />;

          // Update Edit url to only show if you are creator or editor
          // Requires getting User.uid into this component

          const userCanEdit =
            user && circle.creator.uid === user.uid ? true : false;

          const editCircleButton = (
            <Button
              className={classes.marginRight}
              color="primary"
              component={Link}
              to={`/update/${circle.uid}`}
              variant="raised"
            >
              <FontIcon className={classes.marginRight}>mode_edit</FontIcon>
              Edit
            </Button>
          );

          return (
            <div>
              <AppBar position="static" color="default">
                <Toolbar>
                  {userCanEdit ? editCircleButton : null}
                  <Button
                    className={classes.marginRight}
                    color="primary"
                    component={Link}
                    to={`/copy/${circle.uid}`}
                    variant="raised"
                  >
                    <FontIcon className={classes.marginRight}>
                      content_copy
                    </FontIcon>
                    Copy
                  </Button>

                  <DeleteCircle uid={circle.uid}>
                    <Button color="primary" variant="raised">
                      <FontIcon className={classes.marginRight}>
                        delete
                      </FontIcon>
                      Delete
                    </Button>
                  </DeleteCircle>
                </Toolbar>
              </AppBar>
              <h1>{circle.title}</h1>
              <div>{circle.uid}</div>
              <button onClick={() => this.setState({ bool: !this.state.bool })}>
                Toggle components
              </button>
              {this.state.bool ? (
                <Description
                  circle={filter(Description.fragments.circle, circle)}
                />
              ) : (
                <Lines circle={filter(Lines.fragments.circle, circle)} />
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(CircleByKey);
