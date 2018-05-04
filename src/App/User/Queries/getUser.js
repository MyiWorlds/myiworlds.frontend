import gql from 'graphql-tag';

export default gql`
  {
    getUser {
      id
      uid
      username
    }
  }
`;
