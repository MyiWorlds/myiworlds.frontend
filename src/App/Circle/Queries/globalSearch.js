import gql from 'graphql-tag';

export default gql`
  query globalSearch($circle: JSON!) {
    globalSearch(circle: $circle) {
      uid
      type
      type
      lines {
        uid
        title
        type
        icon
        settings
        lines {
          uid
          type
          settings
          lines {
            settings
            uid
            title
            icon
            type
            description
            tags
          }
        }
      }
    }
  }
`;
