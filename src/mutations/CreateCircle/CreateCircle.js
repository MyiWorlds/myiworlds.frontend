import React from 'react';
import uuid from 'uuid/v1';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

import GET_CIRCLES_BY_USER_KEY from '../../queries/root/getCirclesByUserKey';

import Progress from '../../components/Progress';
import CirclesByUserKey from '../../components/CirclesByUserKey';

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
      _id
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
      let _ids = null;
      if (array && array.length) {
        _ids = [];
        array.forEach(item => _ids.push(item._id));
      }
      return _ids;
    }

    if (circle) {
      this.setState({
        parent: circle._id,
        slug: circle.slug,
        slugName: circle.slugName,
        public: circle.public || false,
        type: circle.type,
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

  submitForm = (event, createCircle, data) => {
    event.preventDefault();

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
      creator: data.getUser._id,
      dateCreated: Date.now(),
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
                  <form
                    onSubmit={event =>
                      this.submitForm(event, createCircle, data)
                    }
                  >
                    <input
                      value={this.state.title}
                      onChange={this.handleInputChange('title')}
                    />
                    <input
                      value={this.state.type}
                      onChange={this.handleInputChange('type')}
                    />
                    <button type="submit">Add Circle</button>
                  </form>
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
