import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';

const styles = {
  container: {
    padding: 12,
  },
};

class SearchField extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    searchTagsField: PropTypes.string.isRequired,
  };

  state = {
    zoom: true,
  };

  render() {
    const { classes, handleChange, searchTagsField, refetch } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          id="tags"
          autoFocus={true}
          autoComplete="off"
          label="Search"
          value={searchTagsField}
          onChange={event => handleChange(event, refetch)}
          margin="normal"
          fullWidth
          // style={{ flexGrow: 1 }}
          InputLabelProps={{
            style: {
              // top: -11,
              lineHeight: '-.25rem',
            },
          }}
          InputProps={{
            style: {
              // top: -11,
              lineHeight: '1.5rem',
            },
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchField);
