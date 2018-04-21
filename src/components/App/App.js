import React from 'react';
// import PropTypes from 'prop-types';

import gql from 'graphql-tag';

import { Query } from 'react-apollo';

import { withStyles } from 'material-ui/styles';

import Progress from '../Progress';
import Navigation from './Navigation';
import Content from './Content';

const GET_USER = gql`
  {
    getUser {
      id
      _id
      username
      email
      uiEnabled
      profileMedia {
        string
      }
      ui {
        id
        title
        lines {
          settings {
            string
            object
          }
          styles {
            string
            object
          }
        }
      }
      homePublic {
        _id
      }
      homePrivate {
        _id
      }
      inbox {
        _id
      }
    }
  }
`;

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavigation: true,
    };
  }

  handleNavigationToggle = () => {
    this.setState({ showNavigation: !this.state.showNavigation });
  };

  render() {
    const { classes } = this.props;
    const { showNavigation } = this.state;

    return (
      <Query query={GET_USER}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${console.log(error)}`</p>;
          const user = data.getUser;

          return (
            <div className={classes.root}>
              {/* <Circle circleKey={user.ui._id} /> */}

              <Navigation
                user={user}
                refetch={refetch}
                showNavigation={showNavigation}
                handleNavigationToggle={this.handleNavigationToggle}
              />
              <Content user={user} showNavigation={showNavigation} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(App);
