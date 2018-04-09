import React from 'react';
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

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitForm = (event, createCircle, data) => {
    event.preventDefault();

    createCircle({
      variables: {
        input: {
          _id: '',
          type: this.state.type,
          title: this.state.title,
          creator: data.getUser._id,
          tags: ['test', 'test2'],
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
        },
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
