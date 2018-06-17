import gql from 'graphql-tag';
import Circle from '../Components/Circle';
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
      ...Circle
      ...Description
      ...Lines @include(if: $includeLines)
    }
  }
  ${Circle.fragments.circle}
  ${Description.fragments.circle}
  ${Lines.fragments.circle}
`;
