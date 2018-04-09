import React from 'react';
import { Query } from 'react-apollo';

import GET_CIRCLE_BY_KEY from '../../queries/root/getCircleByKey';

import Progress from '../Progress';
import NotFound from '../NotFound';

const CircleBySlug = props => (
  <Query
    query={GET_CIRCLE_BY_KEY}
    variables={{ _id: props.location.pathname.substring(4) }}
    skip={!props.location.pathname}
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, refetch, networkStatus }) => {
      if (loading) return <Progress />;
      if (error) return <p>`Error :( ${error}`</p>;

      const circle = data.getCircleByKey;
      if (!circle) return <NotFound />;

      return (
        <div>
          <h1>{circle.title}</h1>
          <div>{circle._id}</div>
        </div>
      );
    }}
  </Query>
);

export default CircleBySlug;
