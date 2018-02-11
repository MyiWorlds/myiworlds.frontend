// @flow
import { graphql, commitMutation, Environment } from 'react-relay';
import history from '../../history';

const mutation = graphql`
  mutation DeleteCircleMutation($input: deleteCircleInput!) {
    deleteCircle(input: $input) {
      message
      idToDelete
      wasDeleted
      numberOfClones
      clonesDeleted
    }
  }
`;

function getConfigs(viewerId) {
  return [
    {
      type: 'RANGE_ADD',
      parentID: viewerId,
      connectionName: 'users',
      edgeName: 'linesMany',
      rangeBehaviors: {
        '': 'append',
      },
    },
  ];
}

function getOptimisticResponse(optimisticCircleObject, viewerId) {
  return {
    deleteCircle: {
      message: 'This was deleted',
    },
  };
}

function commit(environment: Environment, data: Object, viewerId: number) {
  commitMutation(environment, {
    mutation,
    variables: { input: data },
    onCompleted: store => {
      console.log('Completed deleting circle');
      history.push(`/`);
    },
    onError: err => console.error('DeleteCircleMutation onError: ', err),
    optimisticResponse: getOptimisticResponse(data, viewerId),
    configs: getConfigs(viewerId),
  });
}

export default { commit };
