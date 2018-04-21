import React from 'react';
import PropTypes from 'prop-types';

Circle.prototype.propTypes = {
  circle: PropTypes.object,
};

const Circle = props => {
  const { circle } = this.props;
  return (() => {
    switch (circle.type) {
      case 'HEADER':
        return <div>jkaldsf</div>;
      default:
        return (
          <div>
            {circle.title}
            {circle.type}
            {circle._id}
            {circle.slug}
          </div>
        );
    }
  })();
};

export default Circle;
