import gql from 'graphql-tag';

export default gql`
  {
    getUser {
      id
      _id
      username
    }
  }
`;
