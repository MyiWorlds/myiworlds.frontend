import gql from 'graphql-tag';

export default gql`
  query globalSearch($circle: JSON!) {
    globalSearch(circle: $circle) {
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
        settings
        tags
        lines {
          uid
          title
          icon
          type
          settings
          description
          tags
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
