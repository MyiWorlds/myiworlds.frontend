import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchField from './Components/SearchField/SearchField';
import client from '../../../apolloClient';

import GLOBAL_SEARCH from '../../Circle/Queries/globalSearch';
import { Grid, CardActions, Button, Divider } from '@material-ui/core';
import SearchResults from './Components/SearchResults/SearchResults';
import FontIcon from '../FontIcon';
import removePermissionDenied from '../../functions/removePermissionDenied';
import SearchSettings from './SearchSettings';
import SearchBuilder from './SearchBuilder';

const styles = {
  cardContainers: {
    padding: 12,
  },
  container: {},
};

// TODOS:
// Needs to change the url when a search happens so you can go back to it
// IMPORTANT: Issue with not having permissions when searching editable

// !! IMPORTANT !!
// This is the root query, this will render a component which allows the children
// to make their own sub queries

class Search extends React.Component {
  // static propTypes = {
  //   user: PropTypes.object,
  // };

  constructor(props) {
    super(props);
    this.state = {
      searchTagsField: '',
      lastSearch: '',
      tags: [],
      requestedNumberOfResults: 10,
      getMyCreations: true,
      getMyViewable: true,
      getMyEditable: true,
      getAllResults: true,
      // THESE NEXT
      myCircles: [],
      myEditableCircles: [],
      myViewableCircles: [],
      allResults: [],
    };
    this.timeout = 0;
  }

  handleChange = event => {
    this.setState({
      searchTagsField: event.target.value,
    });

    // TODO: Tags are not being processed correctly
    // When you delete they dont refetch new data
    // because it has old tags to search with only

    if (event.target.value === '') {
      clearTimeout(this.timeout);
      this.setState({
        lastSearch: '',
      });
      return;
    }

    if (event.key === 'Enter' || event.key === ' ' || event.key === ',') {
      clearTimeout(this.timeout);
      this.search();
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(async () => {
      await this.search();
    }, 500);
  };

  createSearchTags = searchTagsField => {
    let tags = [];
    tags = searchTagsField.split(/[ ,]+/);

    return tags;
  };

  search = async () => {
    let tagsToSearch = this.createSearchTags(this.state.searchTagsField);

    if (this.state.lastSearch.length) {
      tagsToSearch = tagsToSearch.filter(
        tag => !this.state.lastSearch.includes(tag) || tag !== '',
      );
    }

    const allCircles = await this.getLines(tagsToSearch);

    // TODO: ADD THIS BACK SOMEWHERE
    // Where I merge the results (for querying different tags)
    // Also add back flattenArraysAndRemoveDuplicates at lower level

    this.setState({
      lastSearch: tagsToSearch,
      allResults: allCircles,
    });
  };

  flattenArraysAndRemoveDuplicates = circles => {
    circles = [].concat.apply([], circles);

    circles = [...new Set(circles)];
    return circles;
  };

  getLines = async tagsToSearch => {
    const lines = await Promise.all(
      tagsToSearch.map(async tag => {
        const test = await client.query({
          query: GLOBAL_SEARCH,
          fetchPolicy: 'no-cache',
          variables: {
            getMyCreations: this.state.getMyCreations,
            getMyViewable: this.state.getMyViewable,
            getMyEditable: this.state.getMyEditable,
            getAllResults: this.state.getAllResults,
            kind: 'circles',
            filters: {
              searchConditions: [
                {
                  property: 'tags',
                  condition: '=',
                  value: tag,
                },
              ],
            },
            requestedNumberOfResults: 1,
          },
        });
        return test.data.globalSearch;
      }),
    );

    return lines;
  };

  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };

  updateSearchSettings = object => {
    this.setState(object, () => {
      this.search();
    });
  };

  render() {
    const { classes, user } = this.props;
    const {
      searchTagsField,
      myCircles,
      myViewableCircles,
      myEditableCircles,
      allResults,
      getMyCreations,
      getMyViewable,
      getMyEditable,
      getAllResults,
    } = this.state;

    const lines = allResults;

    return (
      <div className={classes.container}>
        <SearchField
          searchTagsField={searchTagsField}
          handleChange={this.handleChange}
        />
        <Divider />
        <SearchSettings
          updateSearchSettings={this.updateSearchSettings}
          getMyCreations={getMyCreations}
          getMyViewable={getMyViewable}
          getMyEditable={getMyEditable}
          getAllResults={getAllResults}
        />
        <Divider />
        {lines.map((circle, index) => {
          return (
            <Grid container spacing={16} key={circle.uid + index}>
              {circle.lines.map((circle, index) => {
                return (
                  <SearchBuilder
                    key={circle.uid}
                    circle={circle}
                    index={index}
                  />
                );
              })}
            </Grid>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(Search);
