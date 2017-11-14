// @flow
import { graphql, commitMutation, Environment } from 'react-relay';
import history from '../history';

const mutation = graphql`
  mutation LoginMutation($input: createUserInput!) {
    createUser(input: $input) {
      message
      createdUser {
        id
        _id
        username
      }
    }
  }
`;

function getConfigs(viewerId) {
  return [
    {
      type: 'RANGE_ADD',
      parentID: viewerId,
      connectionName: 'userss',
      edgeName: 'linesMany',
      rangeBehaviors: {
        '': 'append',
      },
    },
  ];
}

function getOptimisticResponse(optimisticUserObject, viewerId) {
  return {
    createUser: {
      createdUser: optimisticUserObject,
      // user: {
      //   id: viewerId,
      // },
    },
  };
}

function commit(environment: Environment, data: Object, viewerId: number) {
  commitMutation(environment, {
    mutation,
    variables: { input: data },
    onCompleted: store => {
      if (store.createUser.createdUser.username != null) {
        history.push(`${store.createUser.createdUser.username}`);
      } else {
        return { status: 'User was not created' };
      }
    },
    onError: err => console.error('LoginMutation onError: ', err),
    optimisticResponse: getOptimisticResponse(data, viewerId),
    configs: getConfigs(viewerId),
  });
}

export default { commit };
