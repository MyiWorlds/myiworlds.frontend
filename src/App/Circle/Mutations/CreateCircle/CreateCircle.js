import React from 'react';

import uuid from 'uuid/v1';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';

import GET_CIRCLES_BY_USER_KEY from '../../Queries/getCirclesByUserKey';

import CirclesByUserKey from '../../Components/CirclesByUserKey';
import Progress from '../../../Components/Progress';

const CREATE_CIRCLE = gql`
  mutation createCircle($input: createCircleInput!) {
    createCircle(input: $input) {
      createdCircle {
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
      username
    }
  }
`;

class CreateCircle extends React.Component {
  state = {
    title: '',
    type: '',
    creator: '',
    dateCreated: 0,
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
        parent: circle.uid,
        slug: circle.slug,
        public: false,
        type: circle.type,
        settings: getKeysFromArray(circle.settings),
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

  submitForm = (event, createCircle, data) => {
    event.preventDefault();
    if (window && !data.getUser) {
      window.location.href = '/login/google';
    }

    const state = this.state;

    let slug;
    let uid;
    let pii;
    let _public;

    if (state.slug === '') {
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
      creator: data.getUser.uid,
      dateCreated: Date.now(),
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

    createCircle({
      variables: {
        input: builtCircle,
      },
      refetchQueries: [{ query: GET_CIRCLES_BY_USER_KEY }],
    });
  };

  render() {
    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${console.log(error)}`</p>;

          return (
            <Mutation mutation={CREATE_CIRCLE}>
              {createCircle => (
                <div>
                  <Card
                    style={{
                      margin: '24px auto',
                      padding: 12,
                      maxWidth: 400,
                    }}
                  >
                    <form
                      onSubmit={event =>
                        this.submitForm(event, createCircle, data)
                      }
                    >
                      <TextField
                        id="type"
                        autoFocus={true}
                        label="Type"
                        value={this.state.type}
                        onChange={this.handleInputChange('type')}
                        margin="normal"
                        fullWidth={true}
                      />
                      <br />
                      <TextField
                        id="title"
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleInputChange('title')}
                        margin="normal"
                        fullWidth={true}
                      />
                      <br />
                      <br />
                      <Button
                        style={{ float: 'right' }}
                        variant="raised"
                        color="primary"
                        type="submit"
                      >
                        Add Circle
                      </Button>
                      <br />
                      <br />
                    </form>
                  </Card>
                  <CirclesByUserKey />
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default CreateCircle;
