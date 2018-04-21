import gql from 'graphql-tag';

export default gql`
  {
    getCirclesByUserKey {
      id
      _id
      title
      creator {
        _id
        username
      }
      tags
      slug
      type
    }
  }
`;
