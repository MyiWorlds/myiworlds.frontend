import gql from 'graphql-tag';

export default gql`
  {
    getCirclesByUserKey {
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
