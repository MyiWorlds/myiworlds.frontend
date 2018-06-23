import React from 'react';
import { Query } from 'react-apollo';

import GET_WHOLE_CIRCLE_BY_KEY from '../../Queries/getWholeCircleByKey';
import CreateCircle from '../../Mutations/CreateCircle';

import Progress from '../../../Components/Progress';
import NotFound from '../../../Components/NotFound';

const CopyCircle = props => {
  return (
    <Query query={GET_WHOLE_CIRCLE_BY_KEY} variables={{ uid: props.uid }}>
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