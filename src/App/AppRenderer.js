/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import isEqual from 'lodash/isEqual';
import ErrorPage from '../ErrorPage';
import AppManager from './AppManager';

type Props = {
  error: ?Error,
  data: ?Object,
  retry: () => void,
  query: Function,
  location: Location,
  params: Object,
  components: Array<React.Element<*>> | Promise<Array<React.Element<*>>>,
  render: ?(Array<React.Element<*>>, ?Object, ?Object) => any,
};

type State = {
  error: ?Error,
  title: ?string,
  body: ?React.Element<*>,
};

const defaults = {
  error: null,
  title: 'MyiWorlds',
  body: null,
};

class AppRenderer extends React.Component<any, Props, State> {
  state = {
    ...defaults,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.error && this.props.error !== nextProps.error) {
      this.setState({ error: nextProps.error });
    } else if (
      ((nextProps.query && nextProps.data) ||
        (!nextProps.query && !nextProps.data)) &&
      (this.props.data !== nextProps.data ||
        this.props.location !== nextProps.location ||
        !isEqual(this.props.params, nextProps.params) ||
        this.props.components !== nextProps.components ||
        this.props.render !== nextProps.render)
    ) {
      const promise = Promise.resolve(nextProps.components);

      if (nextProps.render && nextProps.components === promise) {
        promise.then(components => {
          if (
            this.props.components === nextProps.components &&
            nextProps.render
          ) {
            this.setState({
              ...defaults,
              ...nextProps.render(
                components,
                this.props.data,
                this.props.params,
              ),
            });
          }
        });
      } else if (nextProps.render) {
        this.setState({
          ...defaults,
          ...nextProps.render(
            nextProps.components,
            nextProps.data,
            nextProps.params,
          ),
        });
      } else {
        this.setState({ error: new Error('The .render() method is missing.') });
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.props.error !== nextState.error ||
      this.state.title !== nextState.title ||
      this.state.body !== nextState.body
    );
  }

  render() {
    return this.state.error ? (
      <ErrorPage error={this.state.error} />
    ) : (
      <AppManager body={this.state.body} />
    );
  }
}

export default AppRenderer;
