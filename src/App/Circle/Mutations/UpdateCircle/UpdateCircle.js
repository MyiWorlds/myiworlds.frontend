import React from 'react';
import { Query } from 'react-apollo';

import GET_CIRCLE_BY_KEY from '../../Queries/getCircleByKey';
import CircleEditor from './CircleEditor';

import Progress from '../../../Components/Progress';

class CreateCircle extends React.Component {
  render() {
    return (
      <Query query={GET_CIRCLE_BY_KEY} variables={{ uid: this.props.uid }}>
        {({ loading, error, data }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${console.log(error)}`</p>;

          return <CircleEditor circle={data.getCircleByKey} />;
        }}
      </Query>
    );
  }
}

export default CreateCircle;
