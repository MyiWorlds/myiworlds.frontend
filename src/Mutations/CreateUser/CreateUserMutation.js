// @flow
import { graphql, commitMutation, Environment } from 'react-relay';
import history from '../../history';

const mutation = graphql`
  mutation CreateUserMutation($input: createUserInput!) {
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

function commit(environment: Environment, data: Object) {
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
    onError: err => console.error('CreateUserMutation onError: ', err),
  });
}

export default { commit };
