import gql from 'graphql-tag';

export default gql`
  query getCirclesByFilters(
    $kind: String!
    $filters: JSON!
    $requestedNumberOfResults: Int
  ) {
    getCirclesByFilters(
      kind: $kind
      filters: $filters
      requestedNumberOfResults: $requestedNumberOfResults
    ) {
      uid
      id
      title
      slug
      type
      tags
    }
  }
`;
