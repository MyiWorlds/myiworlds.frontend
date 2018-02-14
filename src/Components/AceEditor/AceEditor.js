/* @flow */

import React from 'react';
import PropTypes from 'prop-types';

import brace from 'brace';
import ReactAceEditor from 'react-ace';

import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class AceEditor extends React.Component {
  static defaultProps = {
    handleStateStringChange: () => {},
  };

  static propTypes = {
    handleStateStringChange: PropTypes.func,
    circle: PropTypes.object,
    defaultState: PropTypes.string,
    stateProperty: PropTypes.string,
    mode: PropTypes.string,
  };

  state = {
    editorState: this.props.defaultState,
  };

  onChange = newState => {
    if (this.props.editing) {
      this.setState({ editorState: newState });

      this.props.handleStateStringChange(
        this.props.stateProperty,
        this.state.editorState,
      );
    }
  };

  render() {
    return (
      <div>
        <ReactAceEditor
          ref={instance => {
            this.reactAceEditor = instance;
          }}
          readOnly={!this.props.editing}
          mode={this.props.mode}
          theme="monokai"
          editorProps={{ $blockScrolling: true }}
          name="blah2"
          onChange={newState => this.onChange(newState)}
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          width={'100%'}
          highlightActiveLine={true}
          value={this.state.editorState}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={false}
          showLineNumbers={true}
          tabSize={2}
        />
      </div>
    );
  }
}

export default AceEditor;
