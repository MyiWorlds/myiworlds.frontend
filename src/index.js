import React from 'react';

import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { SheetsRegistry } from 'jss';
import jssNested from 'jss-nested';

import { ApolloProvider } from 'react-apollo';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import apolloClient from './apolloClient';

import App from './App';

const generateClassName = createGenerateClassName();

const sheetsRegistry = new SheetsRegistry();
const jss = create(jssPreset());
jss.use(jssNested());

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <App />
      </JssProvider>
    </ApolloProvider>
  </BrowserRouter>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
