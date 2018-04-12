import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Progress from '../../components/Progress';

const DELETE_CIRCLE = gql`
  mutation deleteCircle($input: deleteCircleInput!) {
    deleteCircle(input: $input) {
      status
      message
      idToDelete
      wasDeleted
      numberOfClones
      clonesDeleted
    }
  }
`;

class DeleteCircle extends React.Component {
  delete = deleteCircle => {
    deleteCircle({
      variables: {
        input: {
          _id: this.props.id,
        },
      },
    });
  };

  render() {
    return (
      <Mutation mutation={DELETE_CIRCLE}>
        {deleteCircle => (
          <button onClick={() => this.delete(deleteCircle)}>Delete</button>
        )}
      </Mutation>
    );
  }
}

export default DeleteCircle;
