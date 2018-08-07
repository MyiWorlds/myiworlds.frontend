import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import { Redirect } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import {
  Button,
  Card,
  CardActions,
  Divider,
  // List,
  // ListItem,
  // ListItemIcon,
  // ListItemText,
  TextField,
  Snackbar,
  withStyles,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import Progress from '../../../Components/Progress';
import FontIcon from '../../../Components/FontIcon';
import ArrayEditor from './ArrayEditor';
import CircleByKey from '../../Components/CircleByKey/CircleByKey';

const UPDATE_CIRCLE = gql`
  mutation updateCircle($input: updateCircleInput!) {
    updateCircle(input: $input) {
      status
      message
      updatedCircle {
        id
        type
        title
      }
    }
  }
`;

const GET_USER = gql`
  {
    getUser {
      id
      uid
    }
  }
`;

const styles = {
  listActions: {
    justifyContent: 'center',
  },
  listActionIcon: {
    marginRight: 8,
  },
  editorActions: {
    justifyContent: 'flex-end',
  },
};

class CircleEditor extends React.Component {
  static propTypes = {
    circle: PropTypes.object.isRequired,
  };

  state = {
    toCircle: false,
    snackbarOpen: false,
    type: '',
    value: 0,
    showLineEditor: false,
    showLinesEditor: false,
  };

  componentWillMount() {
    const circle = this.props.circle || {};

    function getKeysFromArray(array) {
      let uids = null;
      if (array && array.length) {
        uids = [];
        array.forEach(item => uids.push(item.uid));
      }
      return uids;
    }

    if (circle) {
      this.setState({
        uid: circle.uid,
        parent: circle.uid,
        slug: circle.slug,
        public: circle.public || false,
        type: circle.type || '',
        settings: circle.settings,
        styles: getKeysFromArray(circle.styles),
        rating: circle.rating ? circle.rating.uid : null,
        tags: circle.tags,
        title: circle.title,
        subtitle: circle.subtitle,
        description: circle.description,
        media: circle.media ? circle.media.uid : null,
        icon: circle.icon ? circle.icon.uid : null,
        viewers: getKeysFromArray(circle.viewers),
        editors: getKeysFromArray(circle.editors),
        string: circle.string,
        object: circle.object,
        number: circle.number,
        bigNumber: circle.bigNumber,
        boolean: circle.boolean,
        date: circle.date,
        geoPoint: circle.geoPoint,
        line: circle.line ? circle.line.uid : null,
        lines: getKeysFromArray(circle.lines),
        linesMany: getKeysFromArray(circle.linesMany),
      });
    }
  }

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitForm = (event, updateCircle, userUid) => {
    event.preventDefault();

    const state = this.state;

    const typeIsEmpty = state.type === '' || null;
    if (typeIsEmpty) {
      this.setState({ snackbarOpen: true });
      return;
    }

    let slug;
    let uid;
    let pii;
    let _public;

    if (this.state.slug === '') {
      slug = uuid();
    } else {
      slug = state.slug;
    }

    if (state.uid === '' || state.uid === null || state.uid === undefined) {
      uid = uuid();
    } else {
      uid = state.uid;
    }

    if (state.pii === null || state.pii === undefined) {
      pii = false;
    } else {
      pii = state.pii;
    }

    if (state.public === null || state.public === undefined) {
      _public = false;
    } else {
      _public = state.public;
    }

    const circle = {
      uid: uid,
      pii: pii,
      creator: userUid,
      dateCreated: state.dateCreated || Date.now(),
      dateUpdated: Date.now(),

      parent: state.parent,
      slug: slug,
      public: _public,
      type: state.type,
      settings: state.settings,
      styles: state.styles,
      rating: state.rating,
      tags: state.tags,
      title: state.title,
      subtitle: state.subtitle,
      description: state.description,
      media: state.media,
      icon: state.icon,
      viewers: state.viewers,
      editors: state.editors,
      string: state.string,
      object: state.object,
      number: state.number,
      bigNumber: state.bigNumber,
      boolean: state.boolean,
      date: state.date,
      geoPoint: state.geoPoint,
      line: state.line,
      lines: state.lines,
      linesMany: state.linesMany,
    };

    const builtCircle = [
      Object.keys(circle).forEach(
        uid =>
          (circle[uid] === '' ||
            circle[uid] === null ||
            circle[uid] === undefined) &&
          delete circle[uid],
      ),
      circle,
    ][1];

    updateCircle({
      variables: {
        input: builtCircle,
      },
    });

    this.setState({
      uid: uid,
      toCircle: true,
    });
  };
  handleBooleanTrue = key => {
    this.setState({ [key]: true });
  };

  handleBooleanFalse = key => {
    this.setState({ [key]: false });
  };

  handleSetState = object => {
    this.setState(object);
  };

  // Redo
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      title,
      type,
      line,
      lines,
      showLineEditor,
      showLinesEditor,
      uid,
      toCircle,
    } = this.state;
    const { classes } = this.props;

    if (toCircle === true) {
      return <Redirect to={`/uid/${uid}`} />;
    }

    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) return <Progress />;
          if (error) return <p>Error</p>;

          return (
            <Mutation mutation={UPDATE_CIRCLE}>
              {updateCircle => (
                <div>
                  <form
                    onSubmit={event =>
                      this.submitForm(event, updateCircle, data.getUser.uid)
                    }
                  >
                    <Card
                      style={{
                        margin: '24px auto',
                        maxWidth: 400,
                      }}
                    >
                      <div
                        style={{
                          padding: 12,
                        }}
                      >
                        <FormControl>
                          <InputLabel htmlFor="type">Type</InputLabel>
                          <Select
                            value={type}
                            onChange={this.handleChange}
                            inputProps={{
                              name: 'type',
                              id: 'type',
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={'IMAGE'}>Image</MenuItem>
                            <MenuItem value={'STRING'}>Sentence</MenuItem>
                            <MenuItem value={'TEXT'}>Text</MenuItem>
                            <MenuItem value={'LINES'}>Lines</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          label="Title"
                          value={title}
                          onChange={this.handleInputChange('title')}
                          margin="normal"
                          fullWidth={true}
                        />
                      </div>

                      <Divider />

                      {/* Make this list component */}
                      {/* <List>
                        <ListItem>
                          <ListItemIcon>
                            <FontIcon>details</FontIcon>
                          </ListItemIcon>
                          <ListItemText
                            primary="Single-line item"
                            secondary={'Secondary text'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <FontIcon>details</FontIcon>
                          </ListItemIcon>
                          <ListItemText
                            primary="Single-line item"
                            secondary={'Secondary text'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <FontIcon>details</FontIcon>
                          </ListItemIcon>
                          <ListItemText
                            primary="Single-line item"
                            secondary={'Secondary text'}
                          />
                        </ListItem>
                      </List> */}

                      <CardActions className={classes.listActions}>
                        <Button
                          onClick={() =>
                            this.handleBooleanTrue('showLineEditor')
                          }
                          color="primary"
                          label="Add"
                        >
                          <FontIcon className={classes.listActionIcon}>
                            add
                          </FontIcon>Add
                        </Button>
                        <Button color="primary" label="Edit">
                          <FontIcon className={classes.listActionIcon}>
                            edit
                          </FontIcon>Edit
                        </Button>
                      </CardActions>

                      {line ? <CircleByKey uid={line} /> : 'none'}

                      <Divider />

                      <CardActions className={classes.listActions}>
                        <Button
                          onClick={() =>
                            this.handleBooleanTrue('showLinesEditor')
                          }
                          color="primary"
                          label="Add"
                        >
                          <FontIcon className={classes.listActionIcon}>
                            add
                          </FontIcon>Add
                        </Button>
                        <Button color="primary" label="Edit">
                          <FontIcon className={classes.listActionIcon}>
                            edit
                          </FontIcon>Edit
                        </Button>
                      </CardActions>

                      {lines
                        ? lines.map(line => (
                            <CircleByKey key={line} uid={line} />
                          ))
                        : 'none'}

                      <Divider />

                      <CardActions className={classes.editorActions}>
                        <Button type="submit" variant="raised" color="primary">
                          Update Circle
                        </Button>
                      </CardActions>
                    </Card>

                    <ArrayEditor
                      id="showLineEditor"
                      listItemType="RADIO"
                      show={showLineEditor}
                      handleSetState={this.handleSetState}
                      title="Select Circle"
                      stateLine={line}
                      stateKey="line"
                    />

                    <ArrayEditor
                      id="showLinesEditor"
                      listItemType="CHECKBOX"
                      show={showLinesEditor}
                      handleSetState={this.handleSetState}
                      title="Connect Circles"
                      stateLines={lines}
                      stateKey="lines"
                    />

                    <Snackbar
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      open={this.state.snackbarOpen}
                      autoHideDuration={4e3}
                      onClose={() => this.setState({ snackbarOpen: false })}
                      SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                      }}
                      message={
                        <span id="message-id">
                          Please select a content Type
                        </span>
                      }
                    />
                  </form>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(CircleEditor);
