/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { CreateCircle_user } from './__generated__/CreateCircle_user.graphql';
import { withStyles } from 'material-ui/styles';

import history from '../../history';
import uuid from 'uuid/v1';

import updateKeyValueStringEvent from '../../functions/updateKeyValues/updateKeyValueStringEvent';
import updateKeyValueString from '../../functions/updateKeyValues/updateKeyValueString';
import toggleKeyValueBoolean from '../../functions/updateKeyValues/toggleKeyValueBoolean';
import updateKeyValueFalse from '../../functions/updateKeyValues/updateKeyValueFalse';

import Snackbar from 'material-ui/Snackbar';
import Divider from '../../Components/Divider';
import Card from '../../Components/Card';
import ComponentController from '../../Components/ComponentController';
import TextField from '../../Components/TextField';
import FontIcon from '../../Components/FontIcon';
import Bar from '../../Components/Bar';
import Editor from './Editor';
import Button from '../../Components/Button';
import CreateCircleMutation from './CreateCircleMutation';

const circle = {
  type: 'LINES',
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

class CreateCircle extends React.Component {
  props: {
    user: CreateCircle_user,
  };

  state = {
    snackbarOpen: false,
    contentShowing: true,
    showHeader: true,
    addTitle: true,
    headerTop: true,

    _id: circle._id ? circle._id : null,
    id: circle._id ? circle._id : null,
    type: circle.type || 'CUSTOM',
    title: '',
    subtitle: '',
    description: '',
    tags: '',
    // creatorId: user.id,
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
    dateCreated: Date.now(),
    dateUpdated: Date.now(),
    string: '',
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
        <ComponentController circle={this.state} />
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
          <Bar
            style={{
              // bottom: 0,
              // right: 0,
              // position: 'fixed',
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
            bottom: 0,
            right: 0,
            position: 'fixed',
            width: 'calc(100%-240px)',
          }}
          dividerTop={true}
          flexDirection="row-reverse"
        >
          <Button
            color="primary"
            raised
            onClick={this.toggleBoolean('snackbarOpen')}
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
      </Card>
    );
  }
}

export default createFragmentContainer(
  withStyles(style, { withTheme: true })(CreateCircle),
  graphql`
    fragment CreateCircle_user on User {
      id
      _id
      username
      ...Lines_lines
    }
  `,
);
