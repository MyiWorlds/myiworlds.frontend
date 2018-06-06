import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import { filter } from 'graphql-anywhere';

import {
  AppBar,
  Card,
  Button,
  Toolbar,
  withStyles,
  Typography,
} from '@material-ui/core';

import GET_CIRCLE_BY_KEY from '../../Queries/getCircleByKey';
import DeleteCircle from '../../Mutations/DeleteCircle';

import FontIcon from '../../../Components/FontIcon';
import Progress from '../../../Components/Progress';
import NotFound from '../../../Components/NotFound';
import Description from './Description';
import Lines from './Lines';

const styles = theme => ({
  card: {
    margin: 24,
    padding: 24,
  },
  marginRight: {
    marginRight: theme.spacing.unit,
  },
});

class CircleByKey extends React.Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    isPrimaryContent: PropTypes.bool,
  };

  state = {
    bool: false,
    showLines: false,
  };

  deleteCircle = () => {};
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <button
          onClick={() => this.setState({ showLines: !this.state.showLines })}
        >
          Toggle me
        </button>
        <Query
          query={GET_CIRCLE_BY_KEY}
          variables={{
            uid: this.props.uid,
            includeLines: this.state.showLines,
          }}
          // skip={!this.props.location.pathname}
          notifyOnNetworkStatusChange
        >
          {({ loading, error, data, refetch, networkStatus }) => {
            if (loading) return <Progress />;
            if (error) return <p>`Error :( ${error}`</p>;

            const circle = data.getCircleByKey;
            if (!circle) return <NotFound />;

            // TODO: Update Edit url to only show if you are creator or editor
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
                {this.props.isPrimaryContent ? (
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
                ) : null}
                <Card className={classes.card}>
                  <Typography variant="display3">{circle.title}</Typography>
                  <Typography variant="subheading">{circle.uid}</Typography>
                  <Button
                    color="primary"
                    onClick={() => this.setState({ bool: !this.state.bool })}
                  >
                    Toggle components
                  </Button>
                  {this.state.bool ? (
                    <Description
                      circle={filter(Description.fragments.circle, circle)}
                    />
                  ) : (
                    <Lines circle={filter(Lines.fragments.circle, circle)} />
                  )}
                </Card>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(CircleByKey);
