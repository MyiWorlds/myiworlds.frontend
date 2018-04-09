import React from 'react';
import { Query } from 'react-apollo';

import GET_CIRCLES_BY_USER_KEY from '../../queries/root/getCirclesByUserKey';

import Progress from '../Progress';
import Lines from '../Lines';

const CirclesByUserKey = () => (
  <Query query={GET_CIRCLES_BY_USER_KEY} notifyOnNetworkStatusChange>
    {({ loading, error, data, refetch, networkStatus }) => {
      if (loading) return <Progress />;
      if (error) return <p>`Error :( ${console.log(error)}`</p>;

      return (
        <div>
          <Lines lines={data.getCirclesByUserKey} />
          {/* <ul>
            {data.getCirclesByUserKey.map(circle => {
              return (
                <li key={circle.id}>
                  <p style={{ fontSize: 12 }}>{circle.title}</p>
                  <p style={{ fontSize: 8 }}>{circle.creator.username}</p>
                  <p style={{ fontSize: 8 }}>{circle.type}</p>
                  <p style={{ fontSize: 8 }}>{circle.slug}</p>
                </li>
              );
            })}
          </ul> */}
          <button onClick={() => refetch()}>Refetch Your Circles</button>
        </div>
      );
    }}
  </Query>
);

export default CirclesByUserKey;
