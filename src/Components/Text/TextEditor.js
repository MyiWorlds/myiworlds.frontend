import React from 'react';
import PropTypes from 'prop-types';

// import { graphql, createFragmentContainer } from 'react-relay';
// import type { TextEditor_container } from './__generated__/TextEditor_container.graphql';

import TextField from '../TextField';

const defaultStyles = {
  container: {
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

const TextEditor = props => {
  const { circleState, handleStateEventChange } = props;

  let styles = {};
  if (props.styles) {
    styles = props.styes;
  } else if (circleState.styles) {
    styles = circleState.styles;
  } else {
    styles = defaultStyles;
  }

  return (
    <div style={styles.container}>
      <TextField
        inputProps={{
          style: styles.string,
        }}
        id="text"
        label="Text"
        fullWidth={true}
        multiline
        margin="normal"
        value={circleState.string}
        onChange={
          handleStateEventChange ? handleStateEventChange('string') : () => {}
        }
      />
    </div>
  );
};

TextEditor.prototype.propTypes = {
  circleState: PropTypes.obj,
  handleStateEventChange: PropTypes.func,
};

TextEditor.prototype.defaultProps = {
  circleState: {},
  handleStateEventChange: () => {},
};

export default TextEditor;
// export default createFragmentContainer(
//   TextEditor,
//   graphql`
//     fragment TextEditor_container on Circle {
//       title
//       subtitle
//       creator {
//         username
//       }
//       styles
//       stylesResources {
//         _id
//         object
//       }
//       settingsResources {
//         settings
//       }
//       string
//     }
//   `,
// );
