import React from 'react';
import { Query } from 'react-apollo';

import GET_WHOLE_CIRCLE_BY_KEY from '../../Queries/getWholeCircleByKey';
import CircleEditor from './CircleEditor';

import Progress from '../../../Components/Progress';

class CreateCircle extends React.Component {
  render() {
    return (
      <Query
        query={GET_WHOLE_CIRCLE_BY_KEY}
        variables={{ uid: this.props.uid }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${console.log(error)}`</p>;

          return <CircleEditor {...this.props} circle={data.getCircleByKey} />;
        }}
      </Query>
    );
  }
}

export default CreateCircle;
