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
    components: () => [
      import(/* webpackChunkName: 'main' */ './Components/ErrorPage'),
    ],
    render: ([ErrorPage]) => ({
      title: 'Error',
      body: <ErrorPage />,
    }),
  },
  {
    path: '/create',
    query: graphql`query routerCreateQuery {
      user {
        ...App_user

        ...CreateCircle_user
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'createCircle' */ './Mutations/CreateCircle'),
    ],
    render: ([CreateCircle], data) => ({
      title: 'Create Circle',
      body: <CreateCircle user={data.user} />,
    }),
  },
  {
    path: '/update/:_id',
    query: graphql`query routerUpdateQuery($_id: String) {
      user {
        ...UpdateCircle_user
      }
      getCircleByKey (_id: $_id ) {
        ...UpdateCircle_getCircleByKey
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'updateCircle' */ './Mutations/UpdateCircle'),
    ],
    render: ([UpdateCircle], data) => ({
      title: 'Update Circle',
      body: (
        <UpdateCircle getCircleByKey={data.getCircleByKey} user={data.user} />
      ),
    }),
  },
  {
    path: '/signup',
    // query: graphql`query routerCreateUserQuery {
    //   user (_id: "davey") {
    //     id
    //     ...App_user
    //     ...CreateUser_user
    //   }
    // }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'signup' */ './Mutations/CreateUser'),
    ],
    render: ([CreateUser]) => ({
      title: 'CreateUser',
      body: <CreateUser />,
    }),
  },
  // {
  //   path: '/login/google',
  //   action: req => {
  //     if (req.user) {
  //       `<p>${req.t('Welcome, {{user}}!', {
  //         user: req.user.username,
  //       })} (<a href="javascript:fetch('/login/clear', { method: 'POST', credentials: 'include' }).then(() => window.location = '/')">${req.t(
  //         'log out',
  //       )}</a>)</p>`;
  //     } else {
  //       `<p>${req.t('Welcome, guest!')} (<a href="/login/google">${req.t(
  //         'sign in',
  //       )}</a>)</p>`;
  //     }
  //   },
  // },
  // {
  //   path: '/login',
  //   query: graphql`query routerLoginUserQuery {
  //     user (_id: "davey") {
  //       id
  //       ...App_user
  //       ...Login_user
  //     }
  //   }`, // prettier-ignore
  //   components: () => [
  //     import(/* webpackChunkName: 'login' */ './Mutations/Login'),
  //   ],
  //   render: ([Login], data) => ({
  //     title: 'Login',
  //     body: <Login user={data.user} />,
  //   }),
  // },
  {
    path: '/login/google/true',
    render: data => ({
      title: 'Logged in',
      body: <div>Logged in</div>,
    }),
  },
  {
    path: '/',
    query: graphql`query routerHomeQuery {
      user {
        ...App_user
      }

      getCircleBySlug (slug: "/") {
        title
        ...GetCircleBySlug_getCircleBySlug
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'home' */ './Queries/GetCircleBySlug'),
    ],
    render: ([GetCircleBySlug], data) => ({
      title:
        data.getCircleBySlug && data.getCircleBySlug.title
          ? data.getCircleBySlug.title
          : 'Untitled',
      body: <GetCircleBySlug getCircleBySlug={data.getCircleBySlug} />,
    }),
  },
  {
    path: '/recents',
    query: graphql`query routerGetCirclesByUserKeyQuery {
      getCirclesByUserKey {
        ...GetCirclesByUserKey_getCirclesByUserKey
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'recents' */ './Queries/GetCirclesByUserKey'),
    ],
    render: ([GetCirclesByUserKey], data) => ({
      title: 'Untitled',
      body: (
        <GetCirclesByUserKey getCirclesByUserKey={data.getCirclesByUserKey} />
      ),
    }),
  },
  {
    path: '/google/google/return',
    action: () => `<h1>test</h1>`,
  },
  {
    path: '/:slug(.*)',
    query: graphql`query routerGetCircleBySlugQuery($slug: String) {
      getCircleBySlug (slug: $slug) {
        title
        ...GetCircleBySlug_getCircleBySlug
      }
    }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'home' */ './Queries/GetCircleBySlug'),
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
