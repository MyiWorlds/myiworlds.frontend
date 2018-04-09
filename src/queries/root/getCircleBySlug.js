import gql from 'graphql-tag';

export default gql`
  query getCircleBySlug($slug: String!) {
    getCircleBySlug(slug: $slug) {
      id
      title
      slug
      type
    }
  }
`;
