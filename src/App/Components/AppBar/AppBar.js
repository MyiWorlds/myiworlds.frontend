import React from 'react';
// import PropTypes from 'prop-types';

import MUIAppBar from 'material-ui/AppBar';
import MUIToolbar from 'material-ui/Toolbar';

// import CircleComponentSwitch from '../CircleComponentSwitch';

class AppBar extends React.Component {
  static propTypes = {};
  render() {
    return (
      <MUIAppBar position="fixed" style={{ zIndex: 1301 }}>
        <MUIToolbar>
          Hello
          {/* <CircleComponentSwitch circle={this.props.circle} /> */}
        </MUIToolbar>
      </MUIAppBar>
    );
  }
}

export default AppBar;
