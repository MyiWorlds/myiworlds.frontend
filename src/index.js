import React from 'react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { SheetsRegistry } from 'jss';
import jssNested from 'jss-nested';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';

import App from './components/App';

const client = new ApolloClient({
  link: new BatchHttpLink({
    uri: 'http://localhost:8080/graphql',
    batchInterval: 100,
  }),
  cache: new InMemoryCache(),
});

const sheetsRegistry = new SheetsRegistry();

const theme = createMuiTheme();
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.use(jssNested());

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </ApolloProvider>
  </BrowserRouter>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
