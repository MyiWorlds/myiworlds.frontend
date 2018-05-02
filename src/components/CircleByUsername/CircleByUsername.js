import React from 'react';
import { Query } from 'react-apollo';

import GET_CIRCLE_BY_USERNAME from '../../queries/root/getCircleByUsername';

import Progress from '../Progress';
import NotFound from '../NotFound';

const CircleByUsername = props => (
  <Query
    query={GET_CIRCLE_BY_USERNAME}
    variables={{
      username: props.username,
    }}
    skip={!props.location.pathname}
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, refetch, networkStatus }) => {
      if (loading) return <Progress />;
      if (error) return <p>Error :( {console.log(error)}</p>;
      if (!data.getCircleByUsername) return <NotFound />;

      return (
        <div>
          <h1>{data.getCircleByUsername.title}</h1>
          <div>{data.getCircleByUsername.slug}</div>
          <button onClick={() => refetch()}>Refetch!</button>
        </div>
      );
    }}
  </Query>
);

export default CircleByUsername;
