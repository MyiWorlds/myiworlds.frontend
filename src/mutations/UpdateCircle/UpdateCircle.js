import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import GET_CIRCLE_BY_KEY from '../../queries/root/getCircleByKey';
import CircleEditor from './CircleEditor';

import Progress from '../../components/Progress';

class CreateCircle extends React.Component {
  render() {
    return (
      <Query
        query={GET_CIRCLE_BY_KEY}
        variables={{ _id: this.props.location.pathname.substring(8) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${console.log(error)}`</p>;

          return <CircleEditor circle={data.getCircleByKey} />;
        }}
      </Query>
    );
  }
}

export default CreateCircle;
