import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Progress from '../../../Components/Progress';

const DELETE_USER = gql`
  mutation deleteUser($input: deleteUserInput!) {
    deleteUser(input: $input) {
      status
      message
    }
  }
`;

class DeleteUser extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  delete = async deleteUser => {
    await deleteUser({
      variables: {
        input: {
          uid: this.props.uid,
        },
      },
    });

    if (window) {
      window.location.href = '/';
    }
  };

  render() {
    return (
      <Mutation mutation={DELETE_USER}>
        {(deleteUser, { loading, error }) => {
          if (loading) return <Progress />;
          if (error) return <p>Error</p>;

          return (
            <div onClick={() => this.delete(deleteUser)} {...this.props}>
              {this.props.children}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteUser;
