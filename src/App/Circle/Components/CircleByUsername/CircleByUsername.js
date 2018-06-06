import React from 'react';
import { Query } from 'react-apollo';

import GET_CIRCLE_BY_USERNAME from '../../Queries/getCircleByUsername';

import Progress from '../../../Components/Progress';
import NotFound from '../../../Components/NotFound';
import { Typography, Button } from '@material-ui/core';

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
          <Typography variant="display4">
            {data.getCircleByUsername.title}
          </Typography>
          <Typography variant="title">
            {data.getCircleByUsername.slug}
          </Typography>
          <Button onClick={() => refetch()}>Refetch</Button>
        </div>
      );
    }}
  </Query>
);

export default CircleByUsername;
