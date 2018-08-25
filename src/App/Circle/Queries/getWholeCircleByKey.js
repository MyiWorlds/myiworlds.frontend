import gql from 'graphql-tag';

export default gql`
  query getCircleByKey($uid: String!) {
    getCircleByKey(uid: $uid) {
      id
      uid
      parent {
        uid
      }
      slug
      public
      type
      settings
      styles {
        uid
      }
      rating {
        uid
      }
      tags
      title
      subtitle
      description
      media {
        uid
      }
      icon
      viewers {
        uid
      }
      editors {
        uid
      }
      string
      object
      number
      bigNumber
      boolean
      date
      geoPoint
      line {
        uid
      }
      lines {
        uid
      }
      linesMany {
        edges {
          node {
            uid
          }
        }
      }
    }
  }
`;
