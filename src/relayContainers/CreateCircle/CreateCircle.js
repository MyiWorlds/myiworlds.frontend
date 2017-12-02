/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { CreateCircle_user } from './__generated__/CreateCircle_user.graphql';
import Button from 'material-ui/Button';
import CreateCircleMutation from './CreateCircleMutation';
import uuid from 'uuid/v1';
import Header from './Header';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card';

class CreateCircle extends React.Component {
  props: {
    user: CreateCircle_user,
  };

  state = {
    snackbarOpen: false,
    contentShowing: true,

    type: '',
    addTitle: true,
    title: '',
    subtitle: '',
    description: '',
    slugName: '',
    dateCreated: Date.now(),
    dateUpdated: Date.now(),
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  requiresTypeSnackbar = () => {
    this.setState({ snackbarOpen: true });
  };

  handleCloseTypeSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  handleSlugChange = action => {
    const slugWithoutSpaces = action.target.value
      .replace(' ', '-')
      .toLowerCase();
    this.setState({
      slugName: slugWithoutSpaces,
    });
  };

  handleBooleanToggle = stateName => {
    this.setState({ [stateName]: !this.state[stateName] });
  };

  createCircle = () => {
    if (this.state.type === '') {
      this.requiresTypeSnackbar();
      return;
    }

    let slug;

    if (this.state.slugName === '') {
      slug = uuid();
    } else {
      slug = this.state.slugName;
    }

    CreateCircleMutation.commit(
      this.props.relay.environment,
      {
        _id: '',
        type: this.state.type,
        title: this.state.title,
        subtitle: this.state.subtitle,
        description: this.state.description,
        creator: this.props.user._id,
        slug: `${this.props.user.username}/${slug}`,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
      },
      this.props.user.id,
    );
  };

  render() {
    const user = this.props.user || {};
    return (
      <Card style={{ padding: 24, margin: 24 }}>
        <Typography type="display2" gutterBottom>
          Create Circle
        </Typography>
        <Header
          user={user}
          contentShowing={this.state.contentShowing}
          handleBooleanToggle={this.handleBooleanToggle}
          addTitle={this.state.addTitle}
          slugName={this.state.slugName}
          handleSlugChange={this.handleSlugChange}
          handleCloseTypeSnackbar={this.handleCloseTypeSnackbar}
          handleChange={this.handleChange}
        />
        <br />
        <br />
        <Card>Content</Card>
        <Button raised color="primary" onClick={this.createCircle}>
          Create
        </Button>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={4e3}
          onRequestClose={this.props.handleCloseTypeSnackbar}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Please select a content Type</span>}
        />
      </Card>
    );
  }
}

export default createFragmentContainer(
  CreateCircle,
  graphql`
    fragment CreateCircle_user on User {
      id
      _id
      username
    }
  `,
);
