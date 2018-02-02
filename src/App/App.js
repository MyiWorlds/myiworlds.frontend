/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import isEqual from 'lodash/isEqual';
import { graphql, QueryRenderer } from 'react-relay';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';

import relay from '../relay';
import router from '../router';
import history from '../history';
import AppRenderer from './AppRenderer';
import 'typeface-roboto';

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment App_user on User {
    username
    uiEnabled
    ui {
      id
      lines {
        id
        type
        string
      }
    }
    homePublic {
      id
      _id
      title
      type
    }
  }
`;

type ReadyState = {
  error: ?Error,
  props: ?Object,
  retry: ?() => void,
};

type Render = (Array<React.Element<*>>, ?Object, ?Object) => any;

type State = {
  location: Location,
  params: Object,
  query: ?Object,
  variables: Object,
  components: ?Array<React.Element<*>> | Promise<Array<React.Element<*>>>,
  render: ?Render,
};

const sheetsRegistry = new SheetsRegistry();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    accent: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
    primaryText: {
      color: grey,
    },
    secondaryText: {
      color: grey,
    },
  },
});

class App extends React.Component<any, any, State> {
  state = {
    location: history.location,
    params: {},
    query: null,
    variables: {},
    components: null,
    render: null,
  };

  unlisten: () => void;

  componentDidMount() {
    // Start watching for changes in the URL (window.location)
    this.unlisten = history.listen(this.resolveRoute);
    this.resolveRoute(history.location);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  resolveRoute = (location: Location) =>
    // Find the route that matches the provided URL path and query string
    router.resolve({ path: location.pathname }).then(route => {
      const variables = isEqual(this.state.variables, route.variables)
        ? this.state.variables
        : route.variables;
      this.setState({ ...route, location, variables });
    });

  renderState = ({ error, props, retry }: ReadyState) => (
    <AppRenderer
      error={error}
      data={props}
      retry={retry}
      query={this.state.query}
      location={this.state.location}
      params={this.state.params}
      components={this.state.components}
      render={this.state.render}
    />
  );

  render() {
    return (
      <JssProvider registry={sheetsRegistry}>
        <MuiThemeProvider theme={theme}>
          <QueryRenderer
            environment={relay}
            query={this.state.query}
            variables={this.state.variables}
            render={this.renderState}
          />
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

// A hook that makes it possible to pre-render the app during compilation.
// Fore more information visit https://github.com/kriasoft/pre-render
window.prerender = async path => {
  history.push(path);
  // TODO: Detect when client-side rendering is complete
  await new Promise(resolve => setTimeout(resolve, 500));
  return document.documentElement.outerHTML
    .replace(/<link type="text\/css" rel="stylesheet" href="blob:.*?>/g, '')
    .replace(/<script .*?<\/head>/g, '</head>');
};

export default App;
