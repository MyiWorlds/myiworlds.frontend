// @flow
import { graphql, commitMutation, Environment } from 'react-relay';
import history from '../../history';

const mutation = graphql`
  mutation UpdateCircleMutation($input: updateCircleInput!) {
    updateCircle(input: $input) {
      message
      updatedCircle {
        id
        _id
        slug
      }
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
    updateCircle: {
      updatedCircle: optimisticCircleObject,
    },
  };
}

function commit(environment: Environment, data: Object, viewerId: number) {
  commitMutation(environment, {
    mutation,
    variables: { input: data },
    onCompleted: store => {
      if (store.updateCircle.updatedCircle.slug != null) {
        const slug = store.updateCircle.updatedCircle.slug;
        return history.push(`/${slug}`);
      } else {
        return { status: 'Circle was not updated' };
      }
    },
    onError: err => console.error('UpdateCircleMutation onError: ', err),
    optimisticResponse: getOptimisticResponse(data, viewerId),
    configs: getConfigs(viewerId),
  });
}

export default { commit };
