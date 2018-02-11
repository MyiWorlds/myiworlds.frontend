import React from 'react';
import PropTypes from 'prop-types';
// https://material-ui-next.com/api/typography/
import MUITypography from 'material-ui/Typography';

const Typography = props => {
  return (
    <MUITypography
      type={props.type}
      style={props.style}
      component={props.component}
      noWrap={props.noWrap}
      paragraph={props.paragraph}
      color={props.color}
      classes={props.classes}
    >
      {props.children}
    </MUITypography>
  );
};

Typography.prototype.propTypes = {
  children: PropTypes.node,
  component: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  noWrap: PropTypes.bool,
  paragraph: PropTypes.bool,
  color: PropTypes.string,
  classes: PropTypes.object,
  style: PropTypes.object,
};

export default Typography;
