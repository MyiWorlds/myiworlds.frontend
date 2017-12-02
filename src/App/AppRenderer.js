/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import isEqual from 'lodash/isEqual';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import ErrorPage from '../ErrorPage';
import AppBar from '../reactComponents/AppBar';
import Navigation from '../reactComponents/Navigation';
import Actions from '../reactComponents/Actions';
import Content from '../reactComponents/Content';

const styles = theme => ({
  root: {
    backgroundColor: 'white',
    position: 'relative',
    display: 'flex',
    height: 'calc(100% - 56px)',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
    },
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

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
  description: ?string,
  hero: ?React.Element<*>,
  body: ?React.Element<*>,
};

const defaults = {
  error: null,
  title: 'MyiWorlds',
  description: '',
  hero: null,
  body: null,
  navigation: {
    width: 240,
    open: true,
  },
};

class AppRenderer extends React.Component<any, Props, State> {
  state = {
    ...defaults,
  };

  handleNavigationToggle = () => {
    this.setState({ navigation: { open: !this.state.navigation.open } });
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
      this.state.description !== nextState.description ||
      this.state.body !== nextState.body ||
      this.state.navigation.open !== nextState.navigation.open
    );
  }

  render() {
    const { classes } = this.props;

    return this.state.error ? (
      <ErrorPage error={this.state.error} />
    ) : (
      <div style={{ height: '100%', width: '100%' }}>
        <AppBar
          handleNavigationToggle={this.handleNavigationToggle}
          title={this.state.title}
        />
        <div className={classes.root}>
          <Navigation
            navOpen={this.state.navigation.open}
            handleNavigationToggle={this.handleNavigationToggle}
          />
          <Content
            navOpen={this.state.navigation.open}
            navWidth={this.state.navigation.width}
          >
            {this.state.body || (
              <CircularProgress className={classes.progress} size={50} />
            )}
          </Content>
          <Actions actions={['createUser']} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AppRenderer);
