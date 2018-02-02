import React from 'react';
import PropTypes from 'prop-types';
import { MenuList } from 'material-ui/Menu';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { Manager, Target, Popper } from 'react-popper';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  popperClose: {
    pointerEvents: 'none',
  },
  menu: {
    zIndex: 99,
  },
};

const Menu = props => {
  return (
    <Manager>
      <Target>{props.target}</Target>
      <Popper
        placement={props.placement}
        eventsEnabled={props.menuState}
        className={
          (classNames({
            [props.classes.popperClose]: !props.menuState,
          }),
          props.classes.menu)
        }
      >
        <ClickAwayListener onClickAway={props.closeMenu}>
          <Grow
            in={props.menuState}
            id="menu-list"
            style={{ transformOrigin: '0 0 0' }}
          >
            <Paper>
              <MenuList role="menu">{props.menuItems}</MenuList>
            </Paper>
          </Grow>
        </ClickAwayListener>
      </Popper>
    </Manager>
  );
};

Menu.prototype.propTypes = {
  menuItems: PropTypes.obj,
  menuState: PropTypes.bool,
  classes: PropTypes.obj,
};

export default withStyles(styles)(Menu);
