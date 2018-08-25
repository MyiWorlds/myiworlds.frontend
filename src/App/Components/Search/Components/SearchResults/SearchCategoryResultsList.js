import React from 'react';
import PropTypes from 'prop-types';

import { Grid, withStyles } from '@material-ui/core';
import NoMoreResults from '../../../../Components/NoMoreResults';
import SearchCategory from '../SearchCategory';

const styles = theme => ({
  container: {
    padding: 8,
  },
  avatar: {
    background: 'none',
  },
});

const SearchCategoryResultList = ({
  circle,
  classes,
  gridSize,
  isSearching,
  resultsDense,
  resultsShowSecondary,
  searchFieldString,
  showMoreResults,
  user,
}) => {
  if (circle && circle.lines && circle.lines.length) {
    return (
      <div className={classes.container}>
        <Grid container spacing={16}>
          {circle.lines.map((circle, index) => {
            return (
              <SearchCategory
                key={circle.uid}
                index={index}
                circle={circle}
                gridSize={gridSize}
                resultsDense={resultsDense}
                resultsShowSecondary={resultsShowSecondary}
                showMoreResults={showMoreResults}
              />
            );
          })}
        </Grid>
      </div>
    );
  } else if (searchFieldString === '' || isSearching) {
    return null;
  } else {
    return <NoMoreResults user={user} />;
  }
};

SearchCategoryResultList.protoTypes = {
  gridSize: PropTypes.object.isRequired,
  isSearching: PropTypes.bool.isRequired,
  showMoreResults: PropTypes.func.isRequired,
  circle: PropTypes.object,
  resultsDense: PropTypes.bool,
  resultsShowSecondary: PropTypes.bool,
  user: PropTypes.object,
};

export default withStyles(styles)(SearchCategoryResultList);
