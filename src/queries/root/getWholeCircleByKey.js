import gql from 'graphql-tag';

export default gql`
  query getCircleByKey($_id: String!) {
    getCircleByKey(_id: $_id) {
      id
      _id
      parent {
        _id
      }
      slug
      slugName
      public
      type
      settings {
        _id
      }
      styles {
        _id
      }
      rating {
        _id
      }
      tags
      title
      subtitle
      description
      media {
        _id
      }
      icon {
        _id
      }
      viewers {
        _id
      }
      editors {
        _id
      }
      string
      object
      number
      bigNumber
      boolean
      date
      geoPoint
      line {
        _id
      }
      lines {
        _id
      }
      linesMany {
        edges {
          node {
            _id
          }
        }
      }
    }
  }
`;
