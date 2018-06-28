import React from 'react';
import { Query } from 'react-apollo';

import GET_ANYTHING_BY_FILTERS from '../../Queries/getAnythingByFilters';

import Progress from '../../../Components/Progress';
import NotFound from '../../../Components/NotFound';

const CirclesByFilters = props => (
  <Query
    query={GET_ANYTHING_BY_FILTERS}
    variables={{
      kind: 'circles',
      filters: {
        searchConditions: [
          {
            property: 'creator',
            condition: '=',
            value: '453a0500-4c13-11e8-9b9b-29e2597ab564',
          },
        ],
      },
      requestedNumberOfResults: 10,
    }}
    // skip={!props.location.pathname}
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, refetch, networkStatus }) => {
      if (loading) return <Progress />;
      if (error) return <p>`Error :( ${error}`</p>;
      if (!data.getCirclesByFilters) return <NotFound />;

      return (
        <div>
          {data.getCirclesByFilters.map(circle => {
            return (
              <div key={circle.uid}>
                <h1>{circle.uid}</h1>
                <div>{circle.type}</div>
                <button onClick={() => refetch()}>Refetch!</button>
              </div>
            );
          })}
        </div>
      );
    }}
  </Query>
);

export default CirclesByFilters;
