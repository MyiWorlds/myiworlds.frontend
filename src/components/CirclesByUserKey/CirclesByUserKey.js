import React from 'react';
import { Query } from 'react-apollo';

import GET_CIRCLES_BY_USER_KEY from '../../queries/root/getCirclesByUserKey';

import Button from 'material-ui/Button';
import Card from 'material-ui/Card';

import Progress from '../Progress';
import Lines from '../Lines';

const CirclesByUserKey = () => (
  <Query query={GET_CIRCLES_BY_USER_KEY} notifyOnNetworkStatusChange>
    {({ loading, error, data, refetch, networkStatus }) => {
      if (loading) return <Progress />;
      if (error)
        return <p>`Circles By User uid error ${console.log(error)}`</p>;

      const circles = data.getCirclesByUserKey;

      if (circles) {
        return (
          <div>
            <Card>
              <Lines lines={circles} />
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

export default CirclesByUserKey;
