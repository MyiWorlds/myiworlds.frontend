import gql from 'graphql-tag';

export default gql`
  query globalSearch(
    $getMyCreations: Boolean!
    $getMyViewable: Boolean!
    $getMyEditable: Boolean!
    $getAllResults: Boolean!
    $kind: String!
    $filters: JSON!
    $requestedNumberOfResults: Int
  ) {
    globalSearch(
      getMyCreations: $getMyCreations
      getMyViewable: $getMyViewable
      getMyEditable: $getMyEditable
      getAllResults: $getAllResults
      kind: $kind
      filters: $filters
      requestedNumberOfResults: $requestedNumberOfResults
    ) {
      uid
      id
      type
      object
      title
      slug
      type
      tags
      icon
      creator {
        username
      }
      lines {
        uid
        title
        type
        object
        icon
        lines {
          uid
          title
          icon
          type
          description
        }
      }
    }
  }
`;
