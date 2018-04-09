import React from 'react';
import { Query } from 'react-apollo';

import GET_CIRCLE_BY_SLUG from '../../queries/root/getCircleBySlug';

import Progress from '../Progress';
import NotFound from '../NotFound';

const CircleBySlug = props => (
  <Query
    query={GET_CIRCLE_BY_SLUG}
    variables={{ slug: props.location.pathname.substring(1) }}
    skip={!props.location.pathname}
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, refetch, networkStatus }) => {
      if (loading) return <Progress />;
      if (error) return <p>`Error :( ${error}`</p>;
      if (!data.getCircleBySlug) return <NotFound />;

      return (
        <div>
          <h1>{data.getCircleBySlug.title}</h1>
          <div>{data.getCircleBySlug.slug}</div>
          <button onClick={() => refetch()}>Refetch!</button>
        </div>
      );
    }}
  </Query>
);

export default CircleBySlug;
