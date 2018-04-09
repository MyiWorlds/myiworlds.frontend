import React from 'react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';

import CreateCircle from './mutations/CreateCircle';

import App from './components/App';
import AppBar from './components/AppBar';
import CirclesByUserKey from './components/CirclesByUserKey';
import CircleBySlug from './components/CircleBySlug';
import CircleByKey from './components/CircleByKey';
import CirclesByTags from './components/CirclesByTags';

import AddUsername from './mutations/AddUsername';

const httpLink = new BatchHttpLink({
  uri: 'http://localhost:8080/graphql',
  // Batching not working
  fetchOptions: {
    batchInterval: 10000,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const Root = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <App />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <CirclesByUserKey {...props} />}
          />
          <Route
            exact
            path="/create"
            render={props => <CreateCircle {...props} />}
          />
          <Route exact path="/about" render={props => <AppBar {...props} />} />
          <Route
            exact
            path="/add-username"
            render={props => <AddUsername {...props} />}
          />
          <Route
            exact
            path="/search"
            render={props => <CirclesByTags {...props} />}
          />
          <Route path="/id/:_id" render={props => <CircleByKey {...props} />} />
          <Route path="/:slug" render={props => <CircleBySlug {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
