import React from 'react';
import PropTypes from 'prop-types';

import ComponentController from '../ComponentController';
import LinesContainer from './LinesContainer';

const Lines = props => {
  const lines =
    props.circle && props.circle.object && props.circle.object.lines
      ? props.circle.object.lines
      : false;

  const listType =
    props.circle.settings && props.circle.settings.listType
      ? props.circle.settings.listType
      : null;

  const linesDisplay = lines ? (
    <div style={props.circle.styles ? props.circle.styles : {}}>
      {lines.map((circle, index) => {
        return (
          <ComponentController
            // {...props}
            key={circle._id + index}
            circle={circle}
            type={listType}
          />
        );
      })}
    </div>
  ) : (
    <LinesContainer componentController={props.componentController} />
  );

  return linesDisplay;
};

Lines.prototype.propTypes = {
  circle: PropTypes.object,
};

export default Lines;
// export default createFragmentContainer(
//   Lines,
//   graphql`
//     fragment Lines_lines on Circle @relay(plural: true) {
//       id
//       _id
//       slug
//       settings {
//         _id
//         lines {
//           _id
//         }
//       }
//       object
//       type
//       title
//       subtitle
//       description
//       string
//     }
//   `,
// );
