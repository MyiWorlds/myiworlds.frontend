import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import GET_ANYTHING_BY_FILTERS from '../../../../Circle/Queries/getAnythingByFilters';

import Progress from '../../../../Components/Progress';
import NotFound from '../../../../Components/NotFound';

const CirclesByFilters = ({ filters, kind, requestedNumberOfResults }) => {
  return (
    <Query
      query={GET_ANYTHING_BY_FILTERS}
      variables={{
        kind: kind || 'circles',
        filters: {
          searchConditions: filters,
        },
        requestedNumberOfResults: requestedNumberOfResults || 10,
      }}
      // skip={!props.location.pathname}
    >
      {({ loading, error, data, refetch }) => {
        if (loading) return <Progress />;
        if (error) return <p>`Error :( ${error}`</p>;
        if (!data.getAnythingByFilters) return <NotFound />;

        return (
          <div>
            {data.getAnythingByFilters.map(circle => {
              return (
                <div key={circle.uid}>
                  <h1>{circle.title}</h1>
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
};

CirclesByFilters.propTypes = {
  searchConditions: PropTypes.array,
  kind: PropTypes.string.isRequired,
  requestedNumberOfResults: PropTypes.number,
};

export default CirclesByFilters;
