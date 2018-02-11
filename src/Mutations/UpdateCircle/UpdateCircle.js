/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { UpdateCircle_getCircleByKey } from './__generated__/UpdateCircle_getCircleByKey.graphql';
import type { UpdateCircle_user } from './__generated__/UpdateCircle_user.graphql';

import { withStyles } from 'material-ui/styles';

import uuid from 'uuid/v1';
import history from '../../history';

import updateKeyValueStringEvent from '../../functions/updateKeyValues/updateKeyValueStringEvent';
import updateKeyValueString from '../../functions/updateKeyValues/updateKeyValueString';
import toggleKeyValueBoolean from '../../functions/updateKeyValues/toggleKeyValueBoolean';
import updateKeyValueFalse from '../../functions/updateKeyValues/updateKeyValueFalse';

import UpdateCircleMutation from './UpdateCircleMutation';
import DeleteCircleMutation from '../DeleteCircle/DeleteCircleMutation';

import { FormControlLabel } from 'material-ui/Form';
import Snackbar from 'material-ui/Snackbar';
import Switch from 'material-ui/Switch';
import Bar from '../../Components/Bar';
import Button from '../../Components/Button';
import Card from '../../Components/Card';
import ComponentController from '../../Components/ComponentController';
import Divider from '../../Components/Divider';
import Editor from '../../Components/Editor';
import FontIcon from '../../Components/FontIcon';
import TextField from '../../Components/TextField';

const circle = {
  type: 'PLAIN_TEXT',
  settings: {
    headerEnabled: false,
  },
  styles: {
    titleContainer: {
      padding: 12,
      marginBottom: '-8px',
    },
    titleText: {
      fontSize: '3.5rem',
      color: 'rgba(0, 0, 0, 0.74)',
      fontFamily: 'Roboto',
      fontWeight: 400,
      letterSpacing: '-.02em',
      lineHeight: '1.30357em',
    },
    subtitleContainer: {
      padding: 12,
    },
    subtitleText: {
      fontSize: '1.5rem',
      color: 'rgba(0, 0, 0, 0.54)',
      fontFamily: 'Roboto',
      fontWeight: 400,
      letterSpacing: '-.02em',
      lineHeight: '1.35417em',
    },
    descriptionContainer: {
      marginTop: '-6px',
      padding: '0px 12px 12px 12px',
    },
    descriptionText: {
      color: 'rgba(0, 0, 0, 0.84)',
    },
    tagsContainer: {
      marginTop: '-6px',
      padding: '0px 12px 12px 12px',
    },
    tagsText: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    lines: [
      '019e1790-cc99-11e7-be26-9784a4731e9b',
      '0a4ad0a0-cc98-11e7-be26-9784a4731e9b',
      '0d29b4d0-dd87-11e7-88eb-8bc241fdd2de',
      '0dd81d40-dd87-11e7-88eb-8bc241fdd2de',
    ],
  },
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

class UpdateCircle extends React.Component {
  props: {
    circle: UpdateCircle_getCircleByKey,
    user: UpdateCircle_user,
  };

  state = {
    snackbarOpen: false,
    contentShowing: true,
    showHeader: true,
    addTitle: true,
    headerTop: true,

    id: this.props.getCircleByKey.id || null,
    _id: this.props.getCircleByKey._id || null,
    public: this.props.getCircleByKey.public || false,
    type: this.props.getCircleByKey.type || 'CUSTOM',
    title: this.props.getCircleByKey.title || '',
    subtitle: this.props.getCircleByKey.subtitle || '',
    description: this.props.getCircleByKey.description || '',
    tags: this.props.getCircleByKey.tags || '',
    creatorId: this.props.getCircleByKey.creator || null,
    creator: {
      username: '',
      media: {
        blob: {
          s: '',
          m: '',
          l: '',
        },
      },
    },
    slugName: '',
    dateCreated: this.props.getCircleByKey.dateCreated || Date.now(),
    dateUpdated: this.props.getCircleByKey.dateUpdated || Date.now(),
    string: this.props.getCircleByKey.string || '',
    boolean: this.props.getCircleByKey.boolean || null,
  };

  handleStateEventChange = name => event => {
    this.setState(updateKeyValueStringEvent(name, event));
  };

  handleStateStringChange = (key, value) => {
    this.setState(updateKeyValueString(key, value.string));
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
      public: this.state.public,
      type: this.state.type,
      title: this.state.title,
      subtitle: this.state.subtitle,
      description: this.state.description,
      tags: this.state.tags !== '' ? this.state.tags.split(',') : null,
      string: this.state.string,
      boolean: this.state.boolean,
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

    UpdateCircleMutation.commit(
      this.props.relay.environment,
      buildCircle,
      this.props.user._id,
    );
  };

  deleteCircle = () => {
    DeleteCircleMutation.commit(
      this.props.relay.environment,
      {
        _id: this.state._id,
      },
      this.props.user._id,
    );
    console.log('deleted');
  };

  // TODO: davey
  // Create new modal system to select type > then it creates > then your editing it from there on out, bottom options will be delete then
  // Create confirm delete modal (circle, settings, styles, and lines)
  // Create select type modal from data (circle, settings, styles, and lines). Lines are options
  render() {
    const user = this.props.user || {};
    const { classes } = this.props;

    const header = (
      <div key="header">
        <div style={circle.styles.titleContainer}>
          <TextField
            inputProps={{
              style: this.state.title ? circle.styles.titleText : null,
            }}
            id="title"
            label="Title"
            fullWidth={true}
            value={this.state.title}
            onChange={this.handleStateEventChange('title')}
          />
        </div>

        <div style={circle.styles.subtitleContainer}>
          <TextField
            inputProps={{
              style: this.state.subtitle ? circle.styles.subtitleText : null,
            }}
            id="subtitle"
            label="Subtitle"
            fullWidth={true}
            value={this.state.subtitle}
            onChange={this.handleStateEventChange('subtitle')}
          />
        </div>
        <div style={circle.styles.descriptionContainer}>
          <TextField
            inputProps={{
              style: this.state.description
                ? circle.styles.descriptionText
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
        <div style={circle.styles.tagsContainer}>
          <TextField
            inputProps={{
              style: this.state.tags ? circle.styles.tagsText : null,
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
          editing={true}
          handleStateEventChange={this.handleStateEventChange}
        />
      </div>
    );

    return (
      <Card
        style={{
          margin: '12px 12px 124px 12px',
          overflow: 'hidden',
          borderRadius: 12,
        }}
      >
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
        <br />
        <br />
        <Divider />
        <div className={classes.fieldsContainer}>
          <TextField
            id="string"
            label="String"
            margin="normal"
            fullWidth={true}
            multiline
            value={this.state.string}
            onChange={this.handleStateEventChange('string')}
          />
          <FormControlLabel
            checked={this.state.boolean ? this.state.boolean : false}
            control={
              <Switch
                onChange={() => this.handleBooleanToggle('boolean')}
                aria-label="boolean"
              />
            }
            label="Boolean"
          />
        </div>
        <br />
        <br />
        <Divider />
        <div style={{ margin: '24px 24px 124px 24px', paddingBottom: '24px' }}>
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
          <Card>
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
          onClose={this.keyValueFalse('snackbarOpen')}
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
  withStyles(style, { withTheme: true })(UpdateCircle),
  graphql`
    fragment UpdateCircle_user on User {
      id
      _id
      username
    }

    fragment UpdateCircle_getCircleByKey on Circle {
      id
      _id
      ui {
        _id
      }
      slug
      slugName
      public
      passwordRequired
      type
      settings {
        _id
      }
      rating {
        _id
      }
      styles {
        _id
      }
      tags
      title
      subtitle
      description
      media {
        _id
      }
      icon {
        _id
      }
      viewers {
        _id
      }
      creator {
        _id
      }
      editors {
        _id
      }
      dateCreated
      dateUpdated
      string
      blob
      number
      boolean
      date
      geoPoint
      line {
        _id
      }
      lines {
        _id
      }
      linesMany {
        edges {
          node {
            _id
          }
        }
      }
    }
  `,
);
