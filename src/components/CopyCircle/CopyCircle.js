import React from 'react';
import { Query } from 'react-apollo';

import GET_WHOLE_CIRCLE_BY_KEY from '../../queries/root/getWholeCircleByKey';
import CreateCircle from '../../mutations/CreateCircle';

import Progress from '../Progress';
import NotFound from '../NotFound';

const CopyCircle = props => {
  return (
    <Query query={GET_WHOLE_CIRCLE_BY_KEY} variables={{ _id: props._id }}>
      {({ loading, error, data, refetch }) => {
        if (loading) return <Progress />;
        if (error) return <p>`Error :( ${error}`</p>;
        if (!data.getCircleByKey) return <NotFound />;

        if (data.getCircleByKey) {
          return <CreateCircle circle={data.getCircleByKey} />;
        }

        return null;
      }}
    </Query>
  );
};

export default CopyCircle;
