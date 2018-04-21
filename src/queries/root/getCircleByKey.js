import gql from 'graphql-tag';
import Description from '../../components/CircleByKey/Description';
import Lines from '../../components/CircleByKey/Lines';

export default gql`
  query getCircleByKey($_id: String!) {
    getCircleByKey(_id: $_id) {
      id
      _id
      type
      creator {
        _id
      }
      title
      ...Description
      ...Lines
    }
  }
  ${Description.fragments.circle}
  ${Lines.fragments.circle}
`;
