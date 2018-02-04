import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Typography from '../Typography';
import Divider from '../Divider';

const circle = {
  settings: {},
  style: {
    containerStyles: {},
    fieldsStyles: {
      margin: 8,
    },
  },
};

const style = {};

const Header = props => {
  const { classes } = props;
  return (
    <div style={circle.style.containerStyles}>
      {props.dividerTop ? <Divider /> : null}
      <div style={circle.style.fieldsStyles}>
        {props.circle.title ? (
          <div>
            <Typography type="display1">{props.circle.title}</Typography>
            <br />
          </div>
        ) : null}
        {props.circle.subtitle ? (
          <div>
            <Typography type="subheading">{props.circle.subtitle}</Typography>
            <br />
          </div>
        ) : null}
        {props.circle.description ? (
          <div>
            <Typography type="body1">{props.circle.description}</Typography>
            <br />
          </div>
        ) : null}
        {props.circle.tags ? (
          <div>
            <Typography type="caption">
              {typeof props.circle.tags === 'string'
                ? props.circle.tags
                : props.circle.tags.join(', ')}
            </Typography>
            <br />
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

export default injectSheet(style)(Header);
