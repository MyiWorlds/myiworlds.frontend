import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, InputAdornment } from '@material-ui/core';
import FontIcon from '../../../FontIcon';
import Progress from '../../../Progress';

const styles = {
  container: {
    padding: '0px 8px 8px 8px',
    margin: '8px 8px 0px 8px',
  },
  textfieldProgress: {
    position: 'relative',
    width: 14,
    height: 14,
    margin: '4px 0px 6px 0px',
    paddingRight: 10,
  },
  searchIcon: {
    margin: 8,
  },
};

const SearchField = ({
  classes,
  handleSearchFieldChange,
  search,
  isSearching,
  searchFieldString,
  refetch,
}) => {
  const progress = (
    <div className={classes.textfieldProgress}>
      <Progress hideBackground size={24} />
    </div>
  );

  const searchIcon = <FontIcon>search</FontIcon>;

  let textfieldIcon = null;

  if (isSearching) {
    textfieldIcon = progress;
  } else {
    textfieldIcon = searchIcon;
  }

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
        onKeyPress={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            search();
          }
        }}
        InputLabelProps={{
          style: {
            lineHeight: '-.25rem',
          },
        }}
        InputProps={{
          style: {
            lineHeight: '1.5rem',
          },
          startAdornment: (
            <InputAdornment
              position="start"
              classes={{ root: classes.searchIcon }}
            >
              {textfieldIcon}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

SearchField.propTypes = {
  handleSearchFieldChange: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  searchFieldString: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchField);
