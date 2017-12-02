// @flow
import { graphql, commitMutation, Environment } from 'react-relay';
import history from '../../history';

const mutation = graphql`
  mutation CreateCircleMutation($input: createCircleInput!) {
    createCircle(input: $input) {
      message
      createdCircle {
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
    createCircle: {
      createdCircle: optimisticCircleObject,
    },
  };
}

function commit(environment: Environment, data: Object, viewerId: number) {
  commitMutation(environment, {
    mutation,
    variables: { input: data },
    onCompleted: store => {
      if (store.createCircle.createdCircle.slug != null) {
        const slug = store.createCircle.createdCircle.slug;
        return history.push(`/${slug}`);
      } else {
        return { status: 'Circle was not created' };
      }
    },
    onError: err => console.error('CreateCircleMutation onError: ', err),
    optimisticResponse: getOptimisticResponse(data, viewerId),
    configs: getConfigs(viewerId),
  });
}

export default { commit };
