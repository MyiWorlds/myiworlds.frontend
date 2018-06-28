import gql from 'graphql-tag';

export default gql`
  query getAnythingByFilters(
    $kind: String!
    $filters: JSON!
    $requestedNumberOfResults: Int
  ) {
    getAnythingByFilters(
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
      creator {
        username
      }
    }
  }
`;
