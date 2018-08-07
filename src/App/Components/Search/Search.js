import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchField from './Components/SearchField/SearchField';
import client from '../../../apolloClient';

import GLOBAL_SEARCH from '../../Circle/Queries/globalSearch';
import { Divider } from '@material-ui/core';
import removePermissionDenied from '../../functions/removePermissionDenied';
import SearchSettings from './SearchSettings';
import SearchCategoryResultsList from './Components/SearchResults/SearchCategoryResultsList';
import removeEmptyValuesFromArray from '../../functions/removeEmptyValuesFromArray';

const styles = {
  cardContainers: {
    padding: 12,
  },
  container: {},
};

const resultCategorySizes = [
  {
    sm: 12,
    md: 12,
    lg: 12,
  },
  {
    sm: 12,
    md: 6,
    lg: 6,
  },
  {
    sm: 12,
    md: 4,
    lg: 4,
  },
  {
    sm: 12,
    md: 4,
    lg: 3,
  },
];

// TODOS:
// Needs to change the url when a search happens so you can go back to it
// IMPORTANT: Issue with not having permissions when searching editable
class Search extends React.Component {
  // static propTypes = {
  //   user: PropTypes.object,
  // };

  constructor(props) {
    super(props);
    this.state = {
      searchFieldString: '',
      lastSearchedTags: [],
      myCreations: true,
      myViewable: true,
      myEditable: true,
      allResults: true,
      results: null,
      gridSize: 0,
    };
    this.timeout = 0;
  }

  updateGridSize = () => {
    const gridOptionsLength = resultCategorySizes.length;
    const newGrid =
      this.state.gridSize >= gridOptionsLength - 1
        ? 0
        : this.state.gridSize + 1;

    this.setState({
      gridSize: newGrid,
    });
  };

  handleSearchFieldChange = event => {
    this.setState({
      searchFieldString: event.target.value,
    });

    if (event.target.value === '') {
      clearTimeout(this.timeout);
      this.setState({
        lastSearchedTags: '',
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
    }, 200);
  };

  createSearchTags = searchFieldString => {
    let tags = [];
    tags = searchFieldString.split(/[ ,]+/);

    return tags;
  };

  createQuery = (filters, requestedNumberOfResults, cursor) => {
    const query = {
      type: 'QUERY',
      settings: {
        kind: 'circles',
        requestedNumberOfResults,
        filters: {
          searchConditions: filters,
        },
        cursor: cursor,
      },
      lines: [],
    };

    return query;
  };

  createQueryContainer = queries => {
    const queryContainer = {
      uid: 'queriesContainer',
      type: 'LINES',
      lines: queries,
    };

    return queryContainer;
  };

  buildSearchQuery = tagsToSearch => {
    const user = this.props.user;
    let allQueries = [];

    if (user) {
      if (this.state.myCreations) {
        const myCreationsQueries = tagsToSearch.map(tag =>
          this.createQuery(
            [
              {
                property: 'creator',
                condition: '=',
                value: user.uid,
              },
              {
                property: 'tags',
                condition: '=',
                value: tag,
              },
            ],
            3,
            null,
          ),
        );

        allQueries.push({
          uid: 'myCreations',
          type: 'LINES',
          title: 'My creations',
          icon: 'account_circle',
          lines: myCreationsQueries,
        });
      }

      if (this.state.myEditable) {
        const myEditableQueries = tagsToSearch.map(tag =>
          this.createQuery(
            [
              {
                property: 'viewers',
                condition: '=',
                value: user.uid,
              },
              {
                property: 'tags',
                condition: '=',
                value: tag,
              },
            ],
            3,
            null,
          ),
        );

        allQueries.push({
          uid: 'myEditable',
          type: 'LINES',
          title: 'Editable to me',
          icon: 'edit',
          lines: myEditableQueries,
        });
      }
    }

    if (this.state.myViewable) {
      const myViewableQueries = tagsToSearch.map(tag =>
        this.createQuery(
          [
            {
              property: 'viewers',
              condition: '=',
              value: user.uid,
            },
            {
              property: 'tags',
              condition: '=',
              value: tag,
            },
          ],
          3,
          null,
        ),
      );

      allQueries.push({
        uid: 'myViewable',
        type: 'LINES',
        title: 'Viewable to me',
        icon: 'remove_red_eye',
        lines: myViewableQueries,
      });
    }

    if (this.state.allResults) {
      const publicQuery = tagsToSearch.map(tag =>
        this.createQuery(
          [
            {
              property: 'public',
              condition: '=',
              value: true,
            },
            {
              property: 'tags',
              condition: '=',
              value: tag,
            },
          ],
          3,
          null,
        ),
      );

      allQueries.push({
        uid: 'allResults',
        type: 'LINES',
        title: 'All results',
        icon: 'public',
        lines: publicQuery,
      });
    }

    const searchQuery = this.createQueryContainer(allQueries);

    return searchQuery;
  };

  combineOldAndNewSearchResults = (oldResults, newResults) => {
    let results = oldResults;
    let combinedSearchResults = [];

    if (oldResults.lines.length) {
      newResults.lines.forEach(newResult => {
        const indexOfMatchingOldResult = oldResults.lines.findIndex(
          oldResult => oldResult.uid === newResult.uid,
        );

        if (indexOfMatchingOldResult >= 0) {
          combinedSearchResults = oldResults.lines[
            indexOfMatchingOldResult
          ].lines.concat(newResult.lines);

          results.lines[indexOfMatchingOldResult].lines = combinedSearchResults;
        } else {
          results.lines.push(newResult);
        }
      });
    } else {
      results.lines = newResults.lines;
    }

    return results;
  };

  filterSearchTags = (tagsToSearch, lastSearchedTags) => {
    tagsToSearch = tagsToSearch.filter(tag => {
      const hasNotBeenSearched = !lastSearchedTags.includes(tag);
      const notEmptySearchTag = tag !== '';
      const isNotDuplicateSearchTag =
        tagsToSearch.filter(searchTag => searchTag === tag).length < 2;

      return hasNotBeenSearched && notEmptySearchTag && isNotDuplicateSearchTag;
    });

    return tagsToSearch;
  };

  removeEmptyCategories = lines => {
    return lines.filter(c => c.lines.length !== 0);
  };

  removeCategoriesWithNoResults = lines => {
    if (!lines || lines.length <= 0) return [];

    return lines.filter(result => {
      let hasResults = false;

      result.lines.map(circle => {
        return circle.lines.length ? (hasResults = true) : false;
      }).length;

      return hasResults;
    });
  };

  removeUnusedSearchCategories = lines => {
    lines = lines.filter(result => this.state[result.uid]);
    return lines;
  };

  trimUnusedSearchResultsAndQueries = (circle, currentSearchWords) => {
    // Remove ones that are not in current search
    circle.lines = circle.lines.map(circle2 => {
      let newResults = circle2;

      newResults.lines = circle2.lines.map(circle3 => {
        const updatedQueryResults = circle3.lines.filter(circle4 => {
          // check to see if they contain any of the tags that was searched
          const isRelevantSearchTerm = currentSearchWords.map(condition =>
            circle4.tags.includes(condition),
          );
          return isRelevantSearchTerm.includes(true);
        });
        circle3.lines = updatedQueryResults;
        return circle3;
      });

      newResults.lines = newResults.lines.filter(cir => {
        return cir.lines.length !== 0;
      });

      return newResults;
    });

    // circle.lines = this.removeEmptyCategories(circle.lines);
    circle.lines = removeEmptyValuesFromArray(circle.lines);

    return circle;
  };

  orderCategoriesBasedOnQuery = (categories, searchQuery) => {
    if (!searchQuery) return categories;

    let newCategoriesOrder = [];
    const searchQueryOrder = searchQuery.lines.map(category => category.uid);

    searchQueryOrder.forEach(searchQueryUid => {
      const matchingCategory = categories.find(
        circle => circle.uid === searchQueryUid,
      );

      if (matchingCategory) {
        newCategoriesOrder.push(matchingCategory);
      }
    });

    return newCategoriesOrder;
  };

  search = async () => {
    const lastSearchedTags = this.state.lastSearchedTags;
    let lastResults = JSON.parse(JSON.stringify(this.state.results));
    let tagsToSearch = this.createSearchTags(this.state.searchFieldString);

    if (lastSearchedTags.length) {
      lastResults = this.trimUnusedSearchResultsAndQueries(
        this.state.results,
        tagsToSearch,
      );
      tagsToSearch = this.filterSearchTags(tagsToSearch, lastSearchedTags);
    }

    let results = lastResults;
    let newResults = false;
    let searchQuery = null;

    if (results && results.lines.length) {
      results.lines = this.removeCategoriesWithNoResults(results.lines);
    }

    if (tagsToSearch.length) {
      searchQuery = this.buildSearchQuery(tagsToSearch);
      newResults = await this.getData(searchQuery);
      // Needed to modify nested parts of the graph
      newResults = JSON.parse(JSON.stringify(newResults));
    }

    if (results && results.lines.length) {
      results.lines = this.removeCategoriesWithNoResults(results.lines);
    }

    // prevous last results were useless
    if (lastResults && newResults) {
      results = this.combineOldAndNewSearchResults(lastResults, newResults);
    } else if (!lastResults && newResults) {
      results = newResults;
    }

    if (results && results.lines.length) {
      results.lines = this.removeCategoriesWithNoResults(results.lines);
      results.lines = this.removeUnusedSearchCategories(results.lines);
      results.lines = this.orderCategoriesBasedOnQuery(
        results.lines,
        searchQuery,
      );
    }

    this.setState({
      lastSearchedTags: this.createSearchTags(this.state.searchFieldString),
      results: results,
    });
  };

  showMoreResults = async category => {
    // If I want to be more performant I could remove all the
    // already fetched queries from the nested Query array
    // and then add them back + push new results into it
    const query = this.createQueryContainer([category]);
    let updatedResults = { ...this.state.results };
    let newResults = await this.getData(query);
    newResults = JSON.parse(JSON.stringify(newResults));

    const updatedResultIndex = updatedResults.lines.findIndex(
      circle => circle.uid === category.uid,
    );
    updatedResults.lines[updatedResultIndex] = newResults.lines[0];

    this.setState({
      results: updatedResults,
    });
  };

  getData = async circle => {
    const results = await client.query({
      query: GLOBAL_SEARCH,
      fetchPolicy: 'no-cache',
      variables: {
        circle,
      },
    });

    return results.data.globalSearch;
  };

  updateSearchCategories = object => {
    const categoryBeingDisabled = object[Object.keys(object)[0]] === false;
    this.setState(
      {
        ...object,
        lastSearchedTags: categoryBeingDisabled
          ? this.state.lastSearchedTags
          : [],
      },
      () => {
        // Todo: Protect searching when nothing to search
        if (categoryBeingDisabled) {
          let results = this.state.results;

          results.lines = this.removeUnusedSearchCategories(results.lines);

          this.setState({ results });
          return;
        }

        this.search();
      },
    );
  };

  render() {
    const { classes } = this.props;
    const {
      searchFieldString,
      myCreations,
      myViewable,
      myEditable,
      allResults,
      results,
    } = this.state;

    return (
      <div className={classes.container}>
        <SearchField
          searchFieldString={searchFieldString}
          handleSearchFieldChange={this.handleSearchFieldChange}
        />
        <Divider />
        <SearchSettings
          updateSearchCategories={this.updateSearchCategories}
          updateGridSize={this.updateGridSize}
          myCreations={myCreations}
          myViewable={myViewable}
          myEditable={myEditable}
          allResults={allResults}
        />
        <Divider />
        <SearchCategoryResultsList
          circle={results}
          searchFieldString={searchFieldString}
          gridSize={resultCategorySizes[this.state.gridSize]}
          showMoreResults={this.showMoreResults}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Search);
