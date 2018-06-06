import gql from 'graphql-tag';

export default gql`
  {
    getCirclesByUserKey {
      uid
      id
      uid
      title
      creator {
        uid
        username
      }
      tags
      slug
      type
    }
  }
`;
