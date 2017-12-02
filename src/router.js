/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import Router from 'universal-router';
import { graphql } from 'relay-runtime';

// The list of all application routes where each route contains a URL path string (pattern),
// the list of components to load asynchronously (chunks), data requirements (GraphQL query),
// and a render() function which shapes the result to be passed into the top-level (App) component.
// For more information visit https://github.com/kriasoft/universal-router
const routes = [
  {
    path: '/error',
    components: () => [import(/* webpackChunkName: 'main' */ './ErrorPage')],
    render: ([ErrorPage]) => ({
      title: 'Error',
      body: <ErrorPage />,
    }),
  },
  {
    path: '/create',
    query: graphql`query routerCreateQuery {
      user (_id: "davey") {
        ...App_user
        ...CreateCircle_user
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'createCircle' */ './relayContainers/CreateCircle'),
    ],
    render: ([CreateCircle], data) => ({
      title: 'Create Circle',
      body: <CreateCircle user={data.user} />,
    }),
  },
  // {
  //   path: '/update/:_id',
  //   query: graphql`query routerEditQuery($_id: String) {
  //     getCircleByKey (_id: $_id) {
  //       type
  //       ...UpdateCircle_getCircleByKey
  //     }
  //   }`, // prettier-ignore
  //   components: () => [
  //     import(/* webpackChunkName: 'updateCircle' */ './Circle/UpdateCircle'),
  //   ],
  //   render: ([UpdateCircle], data) => ({
  //     title: 'Update Circle',
  //     body: <UpdateCircle />,
  //   }),
  // },
  {
    path: '/signup',
    query: graphql`query routerCreateUserQuery {
      user (_id: "davey") {
        id
        ...App_user
        ...CreateUser_user
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'signup' */ './relayContainers/CreateUser'),
    ],
    render: ([CreateUser], data) => ({
      title: 'CreateUser',
      body: <CreateUser user={data.user} />,
    }),
  },
  {
    path: '/login',
    query: graphql`query routerLoginUserQuery {
      user (_id: "davey") {
        id
        ...App_user
        ...Login_user
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'login' */ './relayContainers/Login'),
    ],
    render: ([Login], data) => ({
      title: 'Login',
      body: <Login user={data.user} />,
    }),
  },
  {
    path: '/',
    query: graphql`query routerHomeQuery {
      user (_id: "davey") {
        ...App_user
      }
      getCircleBySlug (slug: "/") {
        title
        ...GetCircleBySlug_getCircleBySlug
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'home' */ './relayContainers/GetCircleBySlug'),
    ],
    render: ([GetCircleBySlug], data) => ({
      title: data.getCircleBySlug.title,
      body: <GetCircleBySlug getCircleBySlug={data.getCircleBySlug} />,
    }),
  },
  {
    path: '/:slug(.*)',
    query: graphql`query routerGetCircleBySlugQuery($slug: String) {
      user (_id: "davey") {
        ...App_user
      }
      getCircleBySlug (slug: $slug) {
        title
        ...GetCircleBySlug_getCircleBySlug
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'home' */ './relayContainers/GetCircleBySlug'),
    ],
    render: ([GetCircleBySlug], data) => ({
      title:
        data.getCircleBySlug && data.getCircleBySlug.title
          ? data.getCircleBySlug.title
          : 'Untitled',
      body: <GetCircleBySlug getCircleBySlug={data.getCircleBySlug} />,
    }),
  },
];

function resolveRoute({ route, fetch, next }, params) {
  // Skip routes that have no .render() method
  if (!route.render) return next();

  // Shape the result to be passed into the top-level React component (App)
  return {
    params,
    query: route.query,
    variables:
      typeof route.variables === 'function'
        ? route.variables(params)
        : { ...params },
    components:
      typeof route.components === 'function'
        ? Promise.all(
            route.components().map(promise => promise.then(x => x.default)),
          ).then(components => (route.components = components))
        : route.components,
    render: route.render,
  };
}

export default new Router(routes, { resolveRoute });
