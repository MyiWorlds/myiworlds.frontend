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
    handleSearchFieldChange: PropTypes.func.isRequired,
    searchFieldString: PropTypes.string.isRequired,
  };

  state = {
    zoom: true,
  };

  render() {
    const {
      classes,
      handleSearchFieldChange,
      searchFieldString,
      refetch,
    } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          id="tags"
          autoFocus={true}
          autoComplete="off"
          label="Search"
          value={searchFieldString}
          onChange={event => handleSearchFieldChange(event, refetch)}
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
