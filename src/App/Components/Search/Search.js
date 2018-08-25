import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import SearchField from './Components/SearchField/SearchField';
import client from '../../../apolloClient';

import GLOBAL_SEARCH from '../../Circle/Queries/globalSearch';
import { Card } from '@material-ui/core';
import SearchSettings from './Components/SearchSettings';
import SearchCategoryResultsList from './Components/SearchResults/SearchCategoryResultsList';
import sortResults from '../../functions/sortArrayLunr';

const styles = {
  cardContainers: {
    padding: 12,
  },
  container: {},
};

const resultCategorySizes = [
  {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    xl: 6,
  },
  {
    xs: 12,
    sm: 12,
    md: 4,
    lg: 4,
    xl: 4,
  },
  {
    xs: 6,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  },
];

class Search extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchFieldString: '',
      lastSearchedTags: [],
      myCreations: true,
      myViewable: true,
      myEditable: true,
      allResults: true,
      results: null,
      gridSize: 0,
      resultsDense: false,
      resultsShowSecondary: true,
    };
    this.timeout = 0;
  }

  componentDidMount() {
    if (this.props.searchString) {
      const searchString = this.props.searchString.replace('-', ' ');

      this.setState(
        {
          searchFieldString: searchString,
        },
        () => {
          this.search();
        },
      );
    }
  }

  // componentDidMount() {
  //   this.setState({ searchFieldString: 'test' }, () => {
  //     this.search();

  //     // this.timeout = setTimeout(() => {
  //     //   this.setState({ searchFieldString: 'test testing' }, async () => {
  //     //     await this.search();
  //     //   });
  //     // }, 800);
  //   });
  // }

  handleChange = object => {
    this.setState(object);
  };

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
      isSearching: true,
    });

    if (event.target.value === '') {
      clearTimeout(this.timeout);
      this.props.history.push(`/search`);
      this.setState({
        isSearching: false,
      });
      return;
    }

    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === ',' ||
      event.key === '-'
    ) {
      this.setState({ isSearching: true }, async () => {
        // clearTimeout(this.timeout);
        await this.search();
        this.setState({
          isSearching: false,
        });
      });
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(async () => {
      await this.search();
      this.setState({ isSearching: false });

      const searchString = this.state.searchFieldString.replace('-', ' ');
      this.props.history.push(`/search/${searchString}`);
    }, 250);
  };

  createSearchTags = searchFieldString => {
    let tags = [];
    tags = searchFieldString.split(/[ ,]+/);

    tags = tags.filter(tag => tag !== '');

    return tags;
  };

  createQuery = (filters, requestedNumberOfResults, cursor) => {
    const query = {
      uid: _.uniqueId(),
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

  buildCircle = circle => {
    const defaultCircle = {
      uid: _.uniqueId(),
      type: '',
    };
    circle = Object.assign({ defaultCircle, circle });

    return circle;
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

    const searchQuery = {
      uid: _.uniqueId(),
      type: 'LINES',
      lines: allQueries,
    };

    return searchQuery;
  };

  combineOldAndNewSearchResults = (oldResults, newResults) => {
    let results =
      oldResults && oldResults.lines.length ? oldResults : newResults;

    if (oldResults && oldResults.lines.length && newResults) {
      newResults.lines.forEach(newResult => {
        const indexOfMatchingOldResult = oldResults.lines.findIndex(
          oldResult => oldResult.uid === newResult.uid,
        );

        if (indexOfMatchingOldResult >= 0) {
          const newResultsObj = newResults.lines[indexOfMatchingOldResult];
          const oldResultsObj = oldResults.lines[indexOfMatchingOldResult];

          let queries = [];

          let lines = {
            uid: _.uniqueId(),
            type: 'LINES',
            lines: [],
          };

          const lastResults = oldResultsObj.lines.find(
            circle => circle.type === 'LINES',
          );

          if (lastResults && lastResults.lines) {
            lines.lines = lines.lines.concat(lastResults.lines);
          }

          const results1 = newResultsObj.lines.find(
            circle => circle.type === 'LINES',
          );

          if (results1 && results1.lines) {
            lines.lines = lines.lines.concat(results1.lines);
          }

          const lastResultsCursors = oldResultsObj.lines.filter(
            circle => circle.type === 'QUERY',
          );

          if (lastResultsCursors.length) {
            queries = queries.concat(lastResultsCursors);
          }

          const newResultsCurors = newResultsObj.lines.filter(
            circle => circle.type === 'QUERY',
          );

          if (newResultsCurors.length) {
            queries = queries.concat(newResultsCurors);
          }

          lines.lines = _.uniqBy(lines.lines, 'uid');
          let combinedResultBlock = [lines, ...queries];

          results.lines[indexOfMatchingOldResult].lines = combinedResultBlock;
        } else {
          results.lines.push(newResult);
        }
      });
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

  removeCategoriesWithNoResults = results => {
    if (results && results.lines) {
      let lines = results.lines;
      if (!lines || lines.length <= 0) {
        results.lines = [];
        return results;
      }

      lines = lines.filter(result => {
        let hasResults = false;

        result.lines.forEach(circle => {
          const isLines = circle.type === 'LINES' && circle.lines.length;
          if (isLines) {
            hasResults = true;
          }
        });

        return hasResults;
      });

      results.lines = lines;
    }

    return results;
  };

  removeUnusedSearchCategories = lines => {
    lines = lines.filter(result => this.state[result.uid]);
    return lines;
  };

  trimUnusedSearchResultsAndQueries = (results, currentSearchWords) => {
    if (results.lines) {
      results.lines = results.lines.map(category => {
        let newResults = category;

        newResults.lines = category.lines.map(results => {
          if (results.type === 'LINES') {
            const updatedQueryResults = results.lines.filter(circle4 => {
              const isRelevantSearchTerm = currentSearchWords.map(condition =>
                circle4.tags.includes(condition),
              );
              return isRelevantSearchTerm.includes(true);
            });
            results.lines = updatedQueryResults;
            return results;
          }

          if (results.type === 'QUERY') {
            const queries = currentSearchWords.map(searchWord => {
              const containsMatch = results.settings.filters.searchConditions.find(
                condition => condition.value === searchWord,
              );

              return containsMatch ? true : false;
            });
            const isRelevantQuery = queries.includes(true);

            if (isRelevantQuery) {
              return results;
            }
          }
          return null;
        });

        newResults.lines = _.compact(newResults.lines);

        return newResults;
      });
    }

    results.lines = _.compact(results.lines);

    return results;
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
    let lastResults = _.cloneDeep(this.state.results);
    let tagsToSearch = this.createSearchTags(this.state.searchFieldString);

    if (lastSearchedTags.length) {
      lastResults = this.trimUnusedSearchResultsAndQueries(
        this.state.results,
        tagsToSearch,
      );
      tagsToSearch = this.filterSearchTags(tagsToSearch, lastSearchedTags);
    }

    let results2 = lastResults;
    let newResults = {
      uid: _.uniqueId(),
      type: 'LINES',
      lines: [],
    };
    let searchQuery = null;

    if (tagsToSearch.length) {
      searchQuery = this.buildSearchQuery(tagsToSearch);
      newResults = await this.getData(searchQuery);
      newResults = _.cloneDeep(newResults);
      newResults = this.compileResultsAndQueries(newResults);
      newResults = this.removeCategoriesWithNoResults(newResults);
    }

    results2 = this.combineOldAndNewSearchResults(lastResults, newResults);

    if (results2 && results2.lines.length) {
      results2.lines = this.removeUnusedSearchCategories(results2.lines);
      if (results2.lines.length) {
        results2.lines = this.orderCategoriesBasedOnQuery(
          results2.lines,
          searchQuery,
        );
      }
    }

    results2 = this.removeCategoriesWithNoResults(results2);

    this.setState({
      lastSearchedTags: this.createSearchTags(this.state.searchFieldString),
      results: results2,
    });
  };

  compileResultsAndQueries = results => {
    let categories = {
      uid: _.uniqueId(),
      type: 'LINES',
      lines: [],
    };

    results.lines.forEach(category => {
      let searchResults = {
        uid: _.uniqueId(),
        type: 'LINES',
        lines: [],
      };

      let showMoreQueries = [];

      category.lines.forEach(query => {
        if (query.lines.length) {
          searchResults.lines = searchResults.lines.concat(query.lines);

          const thisHasMoreResults =
            query.settings.cursor.moreResults === 'MORE_RESULTS_AFTER_LIMIT';

          query.lines = [];

          if (thisHasMoreResults) {
            showMoreQueries.push(query);
          }
        }
      });

      category.lines = [];
      searchResults.lines = _.uniqBy(searchResults.lines, 'uid');
      searchResults.lines = sortResults(
        searchResults.lines,
        this.state.searchFieldString,
      );

      category.lines.push(searchResults);

      if (showMoreQueries.length) {
        category.lines = category.lines.concat(showMoreQueries);
      }

      categories.lines.push(category);
    });

    return categories;
  };

  showMoreResults = async category => {
    const lastResults = category.lines.find(circle => circle.type === 'LINES');
    let categoryClone = _.cloneDeep(category);

    categoryClone.lines = category.lines.filter(
      circle => circle.type === 'QUERY',
    );

    const query = {
      type: 'LINES',
      lines: [categoryClone],
    };

    let newResults = await this.getData(query);
    newResults = _.cloneDeep(newResults);
    newResults = this.compileResultsAndQueries(newResults);

    categoryClone.lines = [];

    const newSearchResults = newResults.lines[0].lines.filter(
      circle => circle.type === 'LINES',
    );

    if (newSearchResults.length) {
      let newCombinedSearchResults = lastResults.lines.concat(
        newSearchResults[0].lines,
      );

      // Double check every result shown is unique
      newCombinedSearchResults = _.uniqBy(newCombinedSearchResults, 'uid');

      lastResults.lines = newCombinedSearchResults;
      categoryClone.lines.push(lastResults);
    }

    const newShowMoreQueries = newResults.lines[0].lines.filter(
      circle => circle.type === 'QUERY',
    );

    if (newShowMoreQueries.length) {
      categoryClone.lines = categoryClone.lines.concat(newShowMoreQueries);
    }

    let updatedResults = { ...this.state.results };

    const updatedResultIndex = updatedResults.lines.findIndex(
      circle => circle.uid === category.uid,
    );

    updatedResults.lines[updatedResultIndex] = categoryClone;
    updatedResults.lines = _.uniqBy(updatedResults.lines, 'uid');

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

  updateSearchCategories = category => {
    const categoryBeingDisabled = category[Object.keys(category)[0]] === false;
    this.setState(
      {
        ...category,
      },
      async () => {
        // Todo: Protect searching when nothing to search
        if (this.state.results === null) {
          return;
        } else if (categoryBeingDisabled) {
          let results = this.state.results;

          results.lines = this.removeUnusedSearchCategories(results.lines);

          this.setState({ results });
          return;
        } else if (
          !categoryBeingDisabled &&
          this.state.searchFieldString !== ''
        ) {
          const categoryName = Object.getOwnPropertyNames(category)[0];

          let newResults = _.cloneDeep(this.state.results);
          let tagsToSearch = this.createSearchTags(
            this.state.searchFieldString,
          );
          let singleCategoryQuery = this.buildSearchQuery(tagsToSearch);

          singleCategoryQuery.lines = singleCategoryQuery.lines.filter(
            category => category.uid === categoryName,
          );

          singleCategoryQuery = await this.getData(singleCategoryQuery);
          singleCategoryQuery = _.cloneDeep(singleCategoryQuery);

          singleCategoryQuery = this.compileResultsAndQueries(
            singleCategoryQuery,
          );

          singleCategoryQuery = this.removeCategoriesWithNoResults(
            singleCategoryQuery,
          );

          if (singleCategoryQuery.lines.length) {
            newResults.lines.unshift(...singleCategoryQuery.lines);
          }

          this.setState({
            results: newResults,
          });
        }
      },
    );
  };

  render() {
    const { classes, user } = this.props;
    const {
      searchFieldString,
      myCreations,
      myViewable,
      myEditable,
      allResults,
      results,
      isSearching,
      resultsDense,
      resultsShowSecondary,
    } = this.state;

    return (
      <div className={classes.container}>
        <Card style={{ margin: 8 }}>
          <SearchField
            isSearching={isSearching}
            searchFieldString={searchFieldString}
            handleSearchFieldChange={this.handleSearchFieldChange}
            search={this.search}
          />
          <SearchSettings
            updateSearchCategories={this.updateSearchCategories}
            updateGridSize={this.updateGridSize}
            myCreations={myCreations}
            myViewable={myViewable}
            myEditable={myEditable}
            allResults={allResults}
            resultsDense={resultsDense}
            resultsShowSecondary={resultsShowSecondary}
            handleChange={this.handleChange}
          />
        </Card>
        <SearchCategoryResultsList
          isSearching={isSearching}
          user={user}
          circle={results}
          searchFieldString={searchFieldString}
          gridSize={resultCategorySizes[this.state.gridSize]}
          showMoreResults={this.showMoreResults}
          resultsDense={resultsDense}
          resultsShowSecondary={resultsShowSecondary}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Search);
