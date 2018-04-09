import gql from 'graphql-tag';

export default gql`
  query getCirclesByTags($tags: [String]!, $requestedNumberOfResults: Int) {
    getCirclesByTags(
      tags: $tags
      requestedNumberOfResults: $requestedNumberOfResults
    ) {
      _id
      id
      title
      slug
      type
      tags
    }
  }
`;
