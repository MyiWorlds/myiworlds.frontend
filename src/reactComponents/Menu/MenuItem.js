import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem as MUIMenuItem } from 'material-ui/Menu';

const MenuItem = props => {
  return (
    <MUIMenuItem key={props.key} onClick={props.onClick}>
      {props.children}
    </MUIMenuItem>
  );
};

MenuItem.prototype.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default MenuItem;
