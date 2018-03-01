/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';

import { withStyles } from 'material-ui/styles';
import LoadingIndicator from '../Components/LoadingIndicator';
import AppBar from '../Components/AppBar';
import Navigation from '../Components/Navigation';
import Actions from '../Components/Actions';
import Content from '../Components/Content';

const style = theme => ({
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
});

class AppManager extends React.Component {
  state = {
    title: 'MyiWorlds',
    showNavigation: true,
    navigation: {
      width: 240,
    },
  };

  handleNavigationToggle = () => {
    this.setState({ showNavigation: !this.state.showNavigation });
  };

  render() {
    const { classes } = this.props;
    let user = this.props.user || {};
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <AppBar
          handleNavigationToggle={this.handleNavigationToggle}
          title={this.state.title}
          user={user}
        />
        <div className={classes.root}>
          <Navigation
            navOpen={this.state.showNavigation}
            handleNavigationToggle={this.handleNavigationToggle}
          />
          <Content
            navOpen={this.state.showNavigation}
            navWidth={this.state.navigation.width}
          >
            {this.props.body || <LoadingIndicator size={50} />}
          </Content>
          <Actions actions={['createUser']} />
        </div>
      </div>
    );
  }
}

export default withStyles(style, { withTheme: true })(AppManager);
