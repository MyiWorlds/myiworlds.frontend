/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { CreateCircle_user } from './__generated__/CreateCircle_user.graphql';
import Button from '../../reactComponents/Button';
import CreateCircleMutation from './CreateCircleMutation';
import uuid from 'uuid/v1';
import Header from './Header';
import Snackbar from 'material-ui/Snackbar';
import Bar from '../../reactComponents/Bar';
import { withStyles } from 'material-ui/styles';
import history from '../../history';
import updateKeyValueStringEvent from '../../functions/updateKeyValues/updateKeyValueStringEvent';
import updateKeyValueString from '../../functions/updateKeyValues/updateKeyValueString';
import Divider from '../../reactComponents/Divider';
import toggleKeyValueBoolean from '../../functions/updateKeyValues/toggleKeyValueBoolean';
import updateKeyValueFalse from '../../functions/updateKeyValues/updateKeyValueFalse';
import Card from '../../reactComponents/Card';
import ComponentController from '../../reactComponents/ComponentController';
import TextField from '../../reactComponents/TextField';

const circle = {
  type: 'VIDEO_YOUTUBE',
};

const styles = theme => ({
  fieldsContainer: {
    margin: '0 auto',
    maxWidth: 800,
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class CreateCircle extends React.Component {
  props: {
    user: CreateCircle_user,
  };

  state = {
    snackbarOpen: false,
    contentShowing: true,
    addTitle: true,

    _id: circle._id ? circle._id : null,
    type: circle.type || 'CUSTOM',
    title: '',
    subtitle: '',
    description: '',
    tags: '',
    slugName: '',
    dateCreated: Date.now(),
    dateUpdated: Date.now(),
    string: '',
  };

  handleStateEventChange = name => event => {
    this.setState(updateKeyValueStringEvent(name, event));
  };

  handleStateStringChange = (key, value) => {
    this.setState(updateKeyValueString(key, value));
  };

  toggleBoolean = name => () => {
    this.setState(toggleKeyValueBoolean(name, this.state[name]));
  };

  keyValueFalse = name => () => {
    this.setState(updateKeyValueFalse(name));
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
      this.toggleBoolean('snackbarOpen');
      return;
    }

    let slug;
    let _id;

    if (this.state.slugName === '') {
      slug = uuid();
    } else {
      slug = this.state.slugName;
    }

    if (
      this.state._id === '' ||
      this.state._id === null ||
      this.state._id === undefined
    ) {
      _id = uuid();
    } else {
      _id = this.state._id;
    }

    const circle = {
      _id: _id,
      type: this.state.type,
      title: this.state.title,
      subtitle: this.state.subtitle,
      description: this.state.description,
      tags: this.state.tags !== '' ? this.state.tags.split(',') : null,
      string: this.state.string,
      creator: this.props.user._id,
      slug: `${this.props.user.username}/${slug}`,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    };

    const buildCircle = [
      Object.keys(circle).forEach(
        key =>
          (circle[key] === '' ||
            circle[key] === null ||
            circle[key] === undefined) &&
          delete circle[key],
      ),
      circle,
    ][1];

    CreateCircleMutation.commit(
      this.props.relay.environment,
      buildCircle,
      this.props.user._id,
    );
  };

  render() {
    const user = this.props.user || {};
    const { classes } = this.props;
    return (
      <Card
        styles={{
          margin: '12px 12px 124px 12px',
          overflow: 'hidden',
          borderRadius: 12,
        }}
      >
        <Header
          user={user}
          contentShowing={this.state.contentShowing}
          handleBooleanToggle={this.handleBooleanToggle}
          addTitle={this.state.addTitle}
          slugName={this.state.slugName}
          handleSlugChange={this.handleSlugChange}
          handleCloseTypeSnackbar={this.keyValueFalse('snackbarOpen')}
          handleStateEventChange={this.handleStateEventChange}
          handleStateStringChange={this.handleStateStringChange}
          type={this.state.type}
        />
        <br />
        <br />
        <Divider />
        <div className={classes.fieldsContainer}>
          <TextField
            id="string"
            label="string"
            margin="normal"
            fullWidth={true}
            value={this.state.string}
            onChange={this.handleStateEventChange('string')}
          />
        </div>
        <br />
        <br />
        <Divider />
        <div style={{ margin: '24px 24px 124px 24px', paddingBottom: '24px' }}>
          <Card>
            <ComponentController circle={this.state} />
          </Card>
        </div>
        <Bar
          styles={{
            bottom: 0,
            right: 0,
            position: 'fixed',
            width: 'calc(100%-240px)',
          }}
          dividerTop={true}
          flexDirection="row-reverse"
        >
          <Button color="primary" raised onClick={this.createCircle}>
            Save
          </Button>
          <Button color="primary" onClick={() => history.goBack()}>
            Cancel
          </Button>
        </Bar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={4e3}
          onRequestClose={this.keyValueFalse('snackbarOpen')}
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
  withStyles(styles, { withTheme: true })(CreateCircle),
  graphql`
    fragment CreateCircle_user on User {
      id
      _id
      username
    }
  `,
);
