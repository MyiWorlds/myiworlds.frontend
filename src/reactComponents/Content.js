/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Main = styled.main`
  position: relative;
  width: 100%;
  z-index: 1;
  flex-grow: 1;
  margin-left: 0px;
  top: 56px;
  transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  @media screen and (min-width: 600px) {
    top: 64px;
    margin-left: 60px;
  }
  @media screen and (min-width: 1000px) {
    margin-left: ${props => (props.navOpen ? '240px' : '60px')};
  }
`;

class Content extends React.Component {
  render() {
    return <Main navOpen={this.props.navOpen}>{this.props.children}</Main>;
  }
}

Content.propTypes = {
  navOpen: PropTypes.bool,
};

export default Content;
