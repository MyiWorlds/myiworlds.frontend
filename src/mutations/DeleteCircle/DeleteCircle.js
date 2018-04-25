import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Progress from '../../components/Progress';

const DELETE_CIRCLE = gql`
  mutation deleteCircle($input: deleteCircleInput!) {
    deleteCircle(input: $input) {
      status
      message
      uidToDelete
      wasDeleted
      numberOfClones
      clonesDeleted
    }
  }
`;

class DeleteCircle extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  delete = deleteCircle => {
    deleteCircle({
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
      <Mutation mutation={DELETE_CIRCLE}>
        {(deleteCircle, { loading, error }) => {
          if (loading) return <Progress />;
          if (error) return <p>Error</p>;

          return (
            <div onClick={() => this.delete(deleteCircle)} {...this.props}>
              {this.props.children}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteCircle;
