import React from 'react';
import { Query } from 'react-apollo';

import GET_CIRCLE_BY_SLUG from '../../Queries/getCircleBySlug';

import Progress from '../../../Components/Progress';
import NotFound from '../../../Components/NotFound';

const CircleBySlug = props => (
  <Query
    query={GET_CIRCLE_BY_SLUG}
    variables={{ username: props.username, slug: props.slug }}
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
