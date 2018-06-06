import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import GET_CIRCLES_BY_USER_KEY from '../../Queries/getCirclesByUserKey';
import Progress from '../../../Components/Progress';
import Lines from '../../../Components/Lines';

const CirclesByUserKey = props => (
  <Query query={GET_CIRCLES_BY_USER_KEY} notifyOnNetworkStatusChange>
    {({ loading, error, data, refetch, networkStatus }) => {
      if (loading) return <Progress />;
      if (error)
        return <p>`Circles By User uid error ${console.log(error)}`</p>;

      const {
        stateLine,
        stateLines,
        handleSetState,
        stateKey,
        listItemType,
      } = props;
      const circles = data.getCirclesByUserKey;

      if (circles) {
        return (
          <div>
            <Card>
              <Lines
                lines={circles}
                stateLine={stateLine}
                stateLines={stateLines}
                handleSetState={handleSetState}
                listItemType={listItemType}
                stateKey={stateKey}
              />
            </Card>
            <br />
            <div style={{ margin: '0 auto' }}>
              <Button color="primary" onClick={() => refetch()}>
                Refetch Your Circles
              </Button>
            </div>
          </div>
        );
      }

      return <div>No Circles</div>;
    }}
  </Query>
);

CirclesByUserKey.propTypes = {
  listItemType: PropTypes.string,
  line: PropTypes.string,
};

export default CirclesByUserKey;
