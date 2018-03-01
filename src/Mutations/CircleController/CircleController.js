/* @flow */

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import uuid from 'uuid/v1';
import history from '../../history';

import updateKeyValueStringEvent from '../../functions/updateKeyValues/updateKeyValueStringEvent';
import updateKeyValueString from '../../functions/updateKeyValues/updateKeyValueString';
import toggleKeyValueBoolean from '../../functions/updateKeyValues/toggleKeyValueBoolean';
import updateKeyValueFalse from '../../functions/updateKeyValues/updateKeyValueFalse';

import Snackbar from 'material-ui/Snackbar';
import Bar from '../../Components/Bar';
import Button from '../../Components/Button';
import Card from '../../Components/Card';
import ComponentController from '../../Components/ComponentController';
import Editor from '../../Components/Editor';
import FontIcon from '../../Components/FontIcon';
import TextField from '../../Components/TextField';
import defaultHeader from './types/defaultHeader';

const tempVarCircle = {
  type: 'LINES',
  lines: [
    '3864b9f1-1537-11e8-9946-83dae007e691',
    '45736d91-1536-11e8-aa70-dd831f7124be',
  ],
};

const style = theme => ({
  fieldsContainer: {
    margin: '0 auto',
    maxWidth: 800,
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 36,
  },
});

class CircleController extends React.Component {
  static propTypes = {
    circle: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      contentShowing: true,
      showHeader: true,
      addTitle: true,
      headerTop: true,

      circle: {
        id: null,
        _id: null,
        type: tempVarCircle.type,
        public: false,
        creator: '',
        slugName: '',
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
      },

      id: null,
      _id: null,
      public: false,
      type: tempVarCircle.type,
      title: '',
      subtitle: '',
      description: '',
      tags: '',
      creatorId: '',
      styles: '',
      slugName: '',
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      string: '',
      boolean: null,
      blob: tempVarCircle.blob,
      lines: tempVarCircle.lines,
    };
  }

  componentWillMount() {
    const circle = this.props.circle;

    if (circle) {
      this.setState({
        id: circle.id || null,
        _id: circle._id || null,
        public: circle.public || false,
        type: circle.type || 'CUSTOM',
        title: circle.title || '',
        subtitle: circle.subtitle || '',
        description: circle.description || '',
        tags: circle.tags ? (circle.tags.length ? circle.tags.join() : '') : '',
        creatorId: circle.creator._id || null,
        styles: circle.styles || '',
        slugName: circle.slugName || '',
        dateCreated: circle.dateCreated || Date.now(),
        dateUpdated: circle.dateUpdated || Date.now(),
        string: circle.string || '',
        boolean: circle.boolean || null,
        blob: circle.blob || null,
        lines: circle.lines || [],
      });
    }
  }
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
      .toString()
      .replace(' ', '-')
      .toLowerCase();

    this.setState({
      slugName: slugWithoutSpaces,
    });
  };

  handleBooleanToggle = stateName => {
    this.setState({ [stateName]: !this.state[stateName] });
  };

  getCircle = () => {
    const state = this.state;
    if (state.type === '') {
      this.toggleBoolean('snackbarOpen');
      return;
    }

    let slug;
    let _id;

    if (state.slugName === '') {
      slug = uuid();
    } else {
      slug = state.slugName;
    }

    if (state._id === '' || state._id === null || state._id === undefined) {
      _id = uuid();
    } else {
      _id = state._id;
    }

    return {
      _id: _id,
      public: state.public || false,
      type: state.type,
      title: state.title,
      subtitle: state.subtitle,
      description: state.description,
      tags:
        state.tags !== ''
          ? state.tags.includes(',') ? state.tags.split(',') : state.tags
          : null,
      string: state.string,
      blob: state.blob && state.blob !== '' ? state.blob : '',
      boolean: state.boolean,
      creator: this.props.user._id,
      slug: `${this.props.user.username}/${slug}`,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      lines: state.lines,
    };
  };

  createCircle = () => {
    // const circle = {
    //   _id: _id,
    //   public: state.public || false,
    //   type: state.type,
    //   title: state.title,
    //   subtitle: state.subtitle,
    //   description: state.description,
    //   tags:
    //     state.tags !== ''
    //       ? state.tags.includes(',') ? state.tags.split(',') : state.tags
    //       : null,
    //   string: state.string,
    //   blob: state.blob && state.blob !== '' ? state.blob : '',
    //   boolean: state.boolean,
    //   creator: this.props.user._id,
    //   slug: `${this.props.user.username}/${slug}`,
    //   dateCreated: Date.now(),
    //   dateUpdated: Date.now(),
    // };
    const circle = this.getCircle();

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

    this.props.createCircleMutation.commit(
      this.props.relayEnvironment,
      buildCircle,
      this.props.user._id,
    );
  };

  updateCircle = () => {
    const circle = this.getCircle();

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

    this.props.updateCircleMutation.commit(
      this.props.relayEnvironment,
      buildCircle,
      this.props.user._id,
    );
  };

  deleteCircle = () => {
    this.props.deleteCircleMutation.commit(
      this.props.relayEnvironment,
      {
        _id: this.state._id,
      },
      this.props.user._id,
    );
    console.log('Circle was deleted');
  };

  render() {
    const user = this.props.user || {};
    const { classes } = this.props;
    const header = (
      <div key="header">
        <div style={defaultHeader.styles.titleContainer}>
          <TextField
            inputProps={{
              style: this.state.title ? defaultHeader.styles.titleText : null,
            }}
            id="title"
            label="Title"
            fullWidth={true}
            value={this.state.title}
            onChange={this.handleStateEventChange('title')}
          />
        </div>

        <div style={defaultHeader.styles.subtitleContainer}>
          <TextField
            inputProps={{
              style: this.state.subtitle
                ? defaultHeader.styles.subtitleText
                : null,
            }}
            id="subtitle"
            label="Subtitle"
            fullWidth={true}
            value={this.state.subtitle}
            onChange={this.handleStateEventChange('subtitle')}
          />
        </div>
        <div style={defaultHeader.styles.descriptionContainer}>
          <TextField
            inputProps={{
              style: this.state.description
                ? defaultHeader.styles.descriptionText
                : null,
            }}
            id="description"
            label="Description"
            type="description"
            fullWidth={true}
            multiline={true}
            value={this.state.description}
            onChange={this.handleStateEventChange('description')}
          />
        </div>
        <div style={defaultHeader.styles.tagsContainer}>
          <TextField
            inputProps={{
              style: this.state.tags ? defaultHeader.styles.tagsText : null,
            }}
            id="tags"
            label="Tags"
            type="tags"
            fullWidth={true}
            multiline={true}
            value={this.state.tags}
            onChange={this.handleStateEventChange('tags')}
          />
        </div>
      </div>
    );

    const content = (
      <div key="content" style={{ height: 500 }}>
        <ComponentController
          circle={this.state}
          editing={this.props.editing}
          componentController={this.props.componentController}
          handleStateEventChange={this.handleStateEventChange}
          handleStateStringChange={this.handleStateStringChange}
        />
      </div>
    );

    return (
      <div>
        <Editor
          user={user}
          circle={this.state}
          contentShowing={this.state.contentShowing}
          handleBooleanToggle={this.handleBooleanToggle}
          showHeader={this.state.showHeader}
          headerTop={this.state.headerTop}
          addTitle={this.state.addTitle}
          slugName={this.state.slugName}
          handleSlugChange={this.handleSlugChange}
          handleCloseTypeSnackbar={this.keyValueFalse('snackbarOpen')}
          handleStateEventChange={this.handleStateEventChange}
          handleStateStringChange={this.handleStateStringChange}
          public={this.state.public}
          type={this.state.type}
          deleteCircle={this.deleteCircle}
        />
        <div>
          <Bar
            style={{
              width: 'calc(100%-240px)',
            }}
            dividerTop={true}
            flexDirection="row-reverse"
          >
            <div className={classes.headerRight}>
              <FontIcon
                button={true}
                style={{
                  fontSize: '32px',
                  transform: 'rotate(90deg)',
                }}
                icon={'view_module'}
                onClick={() => {}}
              />
            </div>
          </Bar>
          <br />
          <Card style={{ marginBottom: '224px' }}>
            {this.state.headerTop
              ? [this.state.showHeader ? header : null, content]
              : [content, this.state.showHeader ? header : null]}
          </Card>
        </div>
        <Bar
          style={{
            paddingRight: 24,
            bottom: 0,
            right: 0,
            zIndex: 999,
            position: 'fixed',
            width: '100%',
          }}
          dividerTop={true}
          flexDirection="row-reverse"
        >
          <Button
            color="primary"
            raised
            onClick={
              this.props.circle
                ? () => this.updateCircle()
                : () => this.createCircle()
            }
          >
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
          onClose={this.keyValueFalse('snackbarOpen')}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Please select a content Type</span>}
        />
      </div>
    );
  }
}

export default withStyles(style, { withTheme: true })(CircleController);
