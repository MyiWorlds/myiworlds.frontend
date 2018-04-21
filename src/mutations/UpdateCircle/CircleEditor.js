import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Progress from '../../components/Progress';
import CirclesByUserKey from '../../components/CirclesByUserKey';
import CirclesByTags from '../../components/CirclesByTags';

import Card from 'material-ui/Card';
import { Snackbar } from 'material-ui';

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
      _id
    }
  }
`;

class CircleEditor extends React.Component {
  static propTypes = {
    circle: PropTypes.object.isRequired,
  };

  state = {
    snackbarOpen: false,
    type: '',
  };

  componentWillMount() {
    const circle = this.props.circle || {};

    function getKeysFromArray(array) {
      let _ids = null;
      if (array && array.length) {
        _ids = [];
        array.forEach(item => _ids.push(item._id));
      }
      return _ids;
    }

    if (circle) {
      this.setState({
        _id: circle._id,
        parent: circle._id,
        slug: circle.slug,
        slugName: circle.slugName,
        public: circle.public || false,
        type: circle.type || '',
        settings: getKeysFromArray(circle.settings),
        styles: getKeysFromArray(circle.styles),
        rating: circle.rating ? circle.rating._id : null,
        tags: circle.tags,
        title: circle.title,
        subtitle: circle.subtitle,
        description: circle.description,
        media: circle.media ? circle.media._id : null,
        icon: circle.icon ? circle.icon._id : null,
        viewers: getKeysFromArray(circle.viewers),
        editors: getKeysFromArray(circle.editors),
        string: circle.string,
        object: circle.object,
        number: circle.number,
        bigNumber: circle.bigNumber,
        boolean: circle.boolean,
        date: circle.date,
        geoPoint: circle.geoPoint,
        line: circle.line ? circle.line._id : null,
        lines: getKeysFromArray(circle.lines),
        linesMany: getKeysFromArray(circle.linesMany),
      });
    }
  }

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitForm = (event, updateCircle, userId) => {
    event.preventDefault();
    const typeIsEmpty = this.state.type === '' || null;
    if (typeIsEmpty) {
      this.setState({ snackbarOpen: true });
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
      creator: userId,
      dateCreated: this.state.dateCreated || Date.now(),
      dateUpdated: Date.now(),

      parent: this.state.parent,
      slug: slug,
      slugName: this.state.slugName,
      public: this.state.public,
      type: this.state.type,
      settings: this.state.settings,
      styles: this.state.styles,
      rating: this.state.rating,
      tags: this.state.tags,
      title: this.state.title,
      subtitle: this.state.subtitle,
      description: this.state.description,
      media: this.state.media,
      icon: this.state.icon,
      viewers: this.state.viewers,
      editors: this.state.editors,
      string: this.state.string,
      object: this.state.object,
      number: this.state.number,
      bigNumber: this.state.bigNumber,
      boolean: this.state.boolean,
      date: this.state.date,
      geoPoint: this.state.geoPoint,
      line: this.state.line,
      lines: this.state.lines,
      linesMany: this.state.linesMany,
    };

    const builtCircle = [
      Object.keys(circle).forEach(
        key =>
          (circle[key] === '' ||
            circle[key] === null ||
            circle[key] === undefined) &&
          delete circle[key],
      ),
      circle,
    ][1];

    updateCircle({
      variables: {
        input: builtCircle,
      },
    }).then(() => this.props.history.push(`/id/${circle._id}`));
  };

  render() {
    const { title, type } = this.state;

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
                      this.submitForm(event, updateCircle, data.getUser._id)
                    }
                  >
                    <input
                      value={title}
                      onChange={this.handleInputChange('title')}
                    />
                    <input
                      value={type}
                      onChange={this.handleInputChange('type')}
                    />
                    <Card style={{ width: 420, margin: '0 auto', padding: 8 }}>
                      <h2>
                        How would you like to find what you are Searching for?
                      </h2>
                      <Card
                        style={{ maxWidth: 400, margin: '0 auto', padding: 8 }}
                      >
                        <h3>Your Recent creations</h3>
                        <CirclesByUserKey />
                      </Card>
                      <div>
                        <h5>Search by Tags</h5>
                        <CirclesByTags />
                      </div>
                      <div>
                        <h5>Your tree</h5>
                        <ul>
                          <li>Circle</li>
                        </ul>
                      </div>
                      <div>
                        <h5>Favorites</h5>
                        <ul>
                          <li>Circle</li>
                        </ul>
                      </div>
                    </Card>
                    <button type="submit">Update Circle</button>

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

export default withRouter(CircleEditor);
