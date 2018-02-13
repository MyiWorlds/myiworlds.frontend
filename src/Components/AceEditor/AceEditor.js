/* @flow */

import React from 'react';
import PropTypes from 'prop-types';

import brace from 'brace';
import ReactAceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

class AceEditor extends React.Component {
  static propTypes = {
    handleStateStringChange: PropTypes.func,
    circle: PropTypes.object,
  };

  state = {
    editorState: this.props.circle.blob,
  };

  onChange = newState => {
    this.setState({ editorState: newState });
    this.props.handleStateStringChange('blob', this.state.editorState);
  };

  render() {
    return (
      <div>
        <ReactAceEditor
          ref={instance => {
            this.reactAceEditor = instance;
          }}
          mode="javascript"
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
