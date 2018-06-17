import React from 'react';
// import PropTypes from 'prop-types';

import gql from 'graphql-tag';

import { Query } from 'react-apollo';

import {
  Card,
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core';

import Progress from './Components/Progress';
import Navigation from './Navigation';
import Content from './Content';
import AppBar from './AppBar';

const GET_USER = gql`
  {
    getUser {
      id
      uid
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
        uid
      }
      homePrivate {
        uid
      }
      inbox {
        uid
      }
    }
  }
`;

const styles = theme => ({
  app: {
    position: 'fixed',
    height: '100%',
    width: '100%',
  },
  root: {
    position: 'relative',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
});

const theme = props =>
  createMuiTheme({
    palette: {
      primary: {
        main: '#2196F3',
      },
      secondary: {
        main: '#f44336',
      },
      // background: {
      //   paper: '#303030',
      // },
      // error: will use the default color
      // type: props.dark ? 'dark' : 'light', // Temp making dark
      type: props.dark ? 'light' : 'dark',
    },
  });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavigation: true,
      themeDark: false,
    };
  }

  handleNavigationToggle = () => {
    this.setState({ showNavigation: !this.state.showNavigation });
  };

  handleToggleBoolean = key => {
    this.setState({ [key]: !this.state[key] });
  };

  render() {
    const { classes } = this.props;
    const { showNavigation, themeDark } = this.state;

    return (
      <MuiThemeProvider theme={theme({ dark: themeDark })}>
        <Query query={GET_USER}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <Progress />;
            if (error) return <p>App had error {console.log(error)}</p>;
            const user = data.getUser;

            return (
              <Card className={classes.app}>
                <div className={classes.root}>
                  {/* <Circle circleKey={user.ui.uid} /> */}
                  <AppBar
                    user={user}
                    handleNavigationToggle={this.handleNavigationToggle}
                    showNavigation={showNavigation}
                    themeDark={themeDark}
                    handleToggleBoolean={this.handleToggleBoolean}
                  />
                  <Navigation
                    user={user}
                    refetch={refetch}
                    themeDark={themeDark}
                    showNavigation={showNavigation}
                    handleToggleBoolean={this.handleToggleBoolean}
                  />
                  <Content user={user} showNavigation={showNavigation} />
                </div>
              </Card>
            );
          }}
        </Query>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
