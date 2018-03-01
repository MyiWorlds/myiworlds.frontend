import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Typography';
import TextField from '../TextField';
import { graphql, createFragmentContainer } from 'react-relay';
import type { LinesContainer_circle } from './__generated__/LinesContainer_circle.graphql';

const defaultStyles = {
  stringContainer: {
    display: 'flex',
    margin: '0 auto',
    flexWrap: 'wrap',
    // margin: '42px 12px 24px 12px',
    maxWidth: 800,
  },
  string: {
    whiteSpace: 'pre',
  },
};

const Text = props => {
  const { circle, handleStateEventChange } = props;

  const editingText = (
    <TextField
      inputProps={{
        style: circle.string
          ? circle.styles && circle.styles.string
            ? circle.styles.string
            : defaultStyles.string
          : null,
      }}
      id="text"
      label="Text"
      fullWidth={true}
      multiline
      margin="normal"
      value={circle.string}
      onChange={
        handleStateEventChange ? handleStateEventChange('string') : () => {}
      }
    />
  );

  const text = (
    <Typography
      style={
        circle.styles && circle.styles.string
          ? circle.styles.string
          : defaultStyles.string
      }
      type={
        circle.settings && circle.settings.textType
          ? circle.settings.textType
          : 'body1'
      }
    >
      {circle.string}
    </Typography>
  );

  return (
    <div
      style={
        circle.styles && circle.styles.container ? circle.styles.container : {}
      }
    >
      {props.editing ? editingText : text}
    </div>
  );
};

Text.prototype.propTypes = {
  circle: PropTypes.obj,
  handleStateEventChange: PropTypes.func,
};

Text.prototype.defaultProps = {
  circle: {},
  handleStateEventChange: () => {},
};

// export default Text;
export default createFragmentContainer(
  Text,
  graphql`
    fragment Text_circle on Circle {
      string
    }
  `,
);
