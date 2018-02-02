import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Typography from '../Typography';
import Divider from '../Divider';

const circle = {
  settings: {},
  styles: {
    containerStyles: {},
    fieldsStyles: {
      margin: 8,
    },
  },
};

const styles = {};

const Header = props => {
  const { classes } = props;
  return (
    <div style={circle.styles.containerStyles}>
      {props.dividerTop ? <Divider /> : null}
      <div style={circle.styles.fieldsStyles}>
        {props.circle.title ? (
          <Typography type="display1">{props.circle.title}</Typography>
        ) : null}
        {props.circle.subtitle ? (
          <Typography type="subheading">{props.circle.subtitle}</Typography>
        ) : null}
        {props.circle.description ? (
          <Typography type="body1">{props.circle.description}</Typography>
        ) : null}
        {props.circle.tags ? (
          <div>
            <b>Tags: </b>
            <Typography type="body1">
              {typeof props.circle.tags === 'string'
                ? props.circle.tags
                : props.circle.tags.join(', ')}
            </Typography>
          </div>
        ) : null}
      </div>
      {props.dividerBottom ? <Divider /> : null}
    </div>
  );
};

Header.prototype.propTypes = {
  circle: PropTypes.obj,
};

export default injectSheet(styles)(Header);
