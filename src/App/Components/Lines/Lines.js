import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {
  ListItemSecondaryAction,
  FormControlLabel,
  Radio,
  Checkbox,
  RadioGroup,
} from '@material-ui/core';

class Lines extends React.Component {
  static defaultProps = {
    stateLine: '',
    stateLines: [],
  };
  static propTypes = {
    lines: PropTypes.array,
    stateLine: PropTypes.string,
    stateLines: PropTypes.array,
    listItemType: PropTypes.string,
    stateKey: PropTypes.string,
  };

  state = {
    checked: null,
    value: null,
  };

  radioGroup = null;

  toggleCheckbox = circle => {
    let stateLines = this.props.stateLines || [];

    if (stateLines.indexOf(circle.uid) === -1) {
      stateLines.push(circle.uid);
      this.props.handleSetState(this.props.stateKey, stateLines);
    } else {
      stateLines = stateLines.filter(id => id !== circle.uid);
      this.props.handleSetState(this.props.stateKey, stateLines);
    }
  };

  // handleToggle = value => () => {
  //   const { checked } = this.state;
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   this.setState({
  //     checked: newChecked,
  //   });
  // };

  renderListSwitch = list => {
    switch (this.props.listItemType) {
      case 'RADIO': {
        return (
          <RadioGroup
            ref={node => {
              this.radioGroup = node;
            }}
            aria-label="circle"
            name="circle"
            value={this.state.value}
          >
            {list}
          </RadioGroup>
        );
      }
      default:
        return list;
    }
  };

  listItem = circle => {
    switch (this.props.listItemType) {
      case 'RADIO': {
        return (
          <ListItem key={circle.id} button>
            <ListItemText
              primary={circle.title}
              secondary={
                circle.type +
                (circle.tags && circle.tags.length
                  ? circle.tags.map(tag => tag)
                  : null)
              }
            />
            <ListItemSecondaryAction>
              <FormControlLabel
                value={circle.uid}
                key={circle.uid}
                control={
                  <Radio
                    onClick={() =>
                      this.props.handleSetState(this.props.stateKey, circle.uid)
                    }
                    color="primary"
                    checked={circle.uid === this.props.stateLine}
                  />
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      }
      case 'CHECKBOX': {
        return (
          <ListItem key={circle.id} button>
            <ListItemText
              primary={circle.title}
              secondary={
                circle.type +
                (circle.tags && circle.tags.length
                  ? circle.tags.map(tag => tag)
                  : null)
              }
            />
            <ListItemSecondaryAction>
              <Checkbox
                onClick={() => this.toggleCheckbox(circle)}
                color="primary"
                checked={
                  this.props.stateLines
                    ? this.props.stateLines.indexOf(circle.uid) !== -1
                    : false
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      }
      default: {
        return (
          <ListItem
            key={circle.id}
            button
            component={Link}
            to={`/uid/${circle.uid}`}
          >
            <ListItemText
              primary={circle.title}
              secondary={
                circle.type +
                (circle.tags && circle.tags.length
                  ? circle.tags.map(tag => tag)
                  : null)
              }
            />
          </ListItem>
        );
      }
    }
  };

  render() {
    const list = (
      <List component="nav">
        {this.props.lines.length
          ? this.props.lines.map((circle, index) => {
              return (
                <div key={circle.id}>
                  {index !== 0 ? <Divider /> : null}
                  {this.listItem(circle)}
                </div>
              );
            })
          : null}
      </List>
    );

    return this.renderListSwitch(list);
  }
}

export default Lines;
