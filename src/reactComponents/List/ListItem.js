import Grid from 'material-ui/Grid';
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = props => {
  return (
    <Grid
      item
      style={props.style}
      xs={props.xs}
      sm={props.sm}
      md={props.md}
      lg={props.lg}
      xl={props.xl}
      spacing={props.spacing}
    >
      {props.children}
    </Grid>
  );
};

ListItem.prototype.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.object,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  spacing: PropTypes.number,
};

export default ListItem;
