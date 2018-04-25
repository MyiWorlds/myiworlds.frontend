import gql from 'graphql-tag';
import Description from '../../components/CircleByKey/Description';
import Lines from '../../components/CircleByKey/Lines';

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
