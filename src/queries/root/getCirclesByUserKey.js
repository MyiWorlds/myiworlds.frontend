import gql from 'graphql-tag';

export default gql`
  {
    getCirclesByUserKey {
      id
      _id
      title
      creator {
        username
      }
      tags
      slug
      type
    }
  }
`;
