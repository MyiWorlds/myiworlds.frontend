import React from 'react';
import PropTypes from 'prop-types';
import MUICard from 'material-ui/Card';

const Card = props => {
  const onClickStyles = props.onClick ? { cursor: 'pointer' } : {};
  const style = Object.assign({}, props.style, onClickStyles);

  return (
    <MUICard
      raised={props.raised}
      style={style}
      elevation={props.elevation}
      onClick={props.onClick ? props.onClick : () => {}}
    >
      {props.children}
    </MUICard>
  );
};

Card.prototype.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  raised: PropTypes.bool,
  elevation: PropTypes.number,
};

export default Card;
