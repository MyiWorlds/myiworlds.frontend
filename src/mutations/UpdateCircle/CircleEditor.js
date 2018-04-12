import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Progress from '../../components/Progress';

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
    title: '',
    type: '',
    creator: '',
    dateCreated: 0,
  };

  componentWillMount() {
    const circle = this.props.circle;
    this.setState({
      _id: circle._id || '',
      title: circle.title || '',
      type: circle.type || '',
    });
  }

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitForm = (event, updateCircle, userId) => {
    event.preventDefault();

    updateCircle({
      variables: {
        input: {
          _id: this.state._id,
          type: this.state.type,
          title: this.state.title,
          creator: userId,
          tags: ['test', 'test2'],
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
        },
      },
    });
  };

  render() {
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
                      value={this.state.title}
                      onChange={this.handleInputChange('title')}
                    />
                    <input
                      value={this.state.type}
                      onChange={this.handleInputChange('type')}
                    />
                    <button type="submit">Update Circle</button>
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

export default CircleEditor;
