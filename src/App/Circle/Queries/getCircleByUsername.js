import gql from 'graphql-tag';

export default gql`
  query getCircleByUsername($username: String!) {
    getCircleByUsername(username: $username) {
      uid
      id
      title
      slug
      type
      tags
    }
  }
`;
