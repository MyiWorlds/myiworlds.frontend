import gql from 'graphql-tag';
import Description from '../Components/CircleByKey/Description';
import Lines from '../Components/CircleByKey/Lines';

export default gql`
  query getCircleByKey($uid: String!) {
    getCircleByKey(uid: $uid) {
      id
      uid
      type
      creator {
        uid
      }
      title
      ...Description
      ...Lines
    }
  }
  ${Description.fragments.circle}
  ${Lines.fragments.circle}
`;
