import gql from 'graphql-tag';
import Description from '../Components/CircleByKey/Description';
import Lines from '../Components/CircleByKey/Lines';

export default gql`
  query getCircleByKey($uid: String!, $includeLines: Boolean = false) {
    getCircleByKey(uid: $uid) {
      id
      uid
      type
      creator {
        uid
      }
      title
      ...Description
      ...Lines @include(if: $includeLines)
    }
  }
  ${Description.fragments.circle}
  ${Lines.fragments.circle}
`;
