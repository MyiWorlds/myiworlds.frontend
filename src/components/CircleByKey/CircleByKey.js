import React from 'react';
import { Query } from 'react-apollo';

import { Link } from 'react-router-dom';

import GET_CIRCLE_BY_KEY from '../../queries/root/getCircleByKey';

import DeleteCircle from '../../mutations/DeleteCircle';

import Progress from '../Progress';
import NotFound from '../NotFound';

class CircleBySlug extends React.Component {
  deleteCircle = () => {};
  render() {
    return (
      <Query
        query={GET_CIRCLE_BY_KEY}
        variables={{ _id: this.props.location.pathname.substring(4) }}
        skip={!this.props.location.pathname}
        notifyOnNetworkStatusChange
      >
        {({ loading, error, data, refetch, networkStatus }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${error}`</p>;

          const circle = data.getCircleByKey;
          if (!circle) return <NotFound />;

          return (
            <div>
              <Link to={`/update/${circle._id}`}>Edit</Link>
              <DeleteCircle id={circle._id} />
              <h1>{circle.title}</h1>
              <div>{circle._id}</div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CircleBySlug;
