import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchField from './Components/SearchField/SearchField';
import client from '../../../apolloClient';

import GET_ANYTHING_BY_FILTERS from '../../Circle/Queries/getAnythingByFilters';
import { Grid } from '@material-ui/core';
import SearchResults from './Components/SearchResults/SearchResults';
import FontIcon from '../FontIcon';
import removePermissionDenied from '../../functions/removePermissionDenied';

const styles = { container: {} };

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
      searchTagsField: '',
      lastSearch: '',
      tags: [],
      requestedNumberOfResults: 10,
      search: false,
      myCircles: [],
      myEditableCircles: [],
      myViewableCircles: [],
      allResults: [],
    };
    this.timeout = 0;
  }

  handleChange = event => {
    this.setState({
      search: false,
      searchTagsField: event.target.value,
    });

    if (event.key === 'Enter' || event.key === ' ' || event.key === ',') {
      clearTimeout(this.timeout);
      this.search();
      return;
    }

    if (this.timeout) {
    }

    this.timeout = setTimeout(async () => {
      await this.search();
    }, 500);
  };

  search = async () => {
    let tagsToSearch = this.createSearchTags(this.state.searchTagsField);

    if (this.state.lastSearch.length) {
      tagsToSearch = this.state.lastSearch.filter(tag =>
        tagsToSearch.includes(tag),
      );
    }

    let circles = this.state.results || [];
    let myCircles = [];
    let myViewableCircles = [];
    let myEditableCircles = [];

    let allCircles = await this.getAllCircles(tagsToSearch);

    if (this.props.user && this.props.user.uid) {
      myCircles = await this.getMyCircles(tagsToSearch);
      myViewableCircles = await this.getMyViewableCircles(tagsToSearch);
      myEditableCircles = await this.getMyEditableCircles(tagsToSearch);
    }

    const combinedResults = this.flattenArraysAndRemoveDuplicates([
      myCircles,
      allCircles,
    ]);

    allCircles = removePermissionDenied(allCircles);

    this.setState({
      lastSearch: tagsToSearch,
      myCircles: myCircles,
      myViewableCircles,
      myEditableCircles,
      allResults: allCircles,
      results: combinedResults,
    });
  };

  flattenArraysAndRemoveDuplicates = circles => {
    circles = [].concat.apply([], circles);

    circles = [...new Set(circles)];
    return circles;
  };

  getMyViewableCircles = async tagsToSearch => {
    return await Promise.all(
      tagsToSearch.map(async tag => {
        const test = await client.query({
          query: GET_ANYTHING_BY_FILTERS,
          variables: {
            kind: 'circles',
            filters: {
              searchConditions: [
                {
                  property: 'viewers',
                  condition: '=',
                  value: this.props.user.uid,
                },
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
        return test.data.getAnythingByFilters;
      }),
    ).then(result => this.flattenArraysAndRemoveDuplicates(result));
  };

  getMyEditableCircles = async tagsToSearch => {
    return await Promise.all(
      tagsToSearch.map(async tag => {
        const test = await client.query({
          query: GET_ANYTHING_BY_FILTERS,
          variables: {
            kind: 'circles',
            filters: {
              searchConditions: [
                {
                  property: 'editors',
                  condition: '=',
                  value: this.props.user.uid,
                },
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
        return test.data.getAnythingByFilters;
      }),
    ).then(result => this.flattenArraysAndRemoveDuplicates(result));
  };

  getMyCircles = async tagsToSearch => {
    return await Promise.all(
      tagsToSearch.map(async tag => {
        const test = await client.query({
          query: GET_ANYTHING_BY_FILTERS,
          variables: {
            kind: 'circles',
            filters: {
              searchConditions: [
                {
                  property: 'creator',
                  condition: '=',
                  value: this.props.user.uid,
                },
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
        return test.data.getAnythingByFilters;
      }),
    ).then(result => this.flattenArraysAndRemoveDuplicates(result));
  };

  getAllCircles = async tagsToSearch => {
    return await Promise.all(
      tagsToSearch.map(async tag => {
        const test = await client.query({
          query: GET_ANYTHING_BY_FILTERS,
          variables: {
            kind: 'circles',
            filters: {
              searchConditions: [
                {
                  property: 'tags',
                  condition: '=',
                  value: tag,
                },
                {
                  property: 'public',
                  condition: '=',
                  value: true,
                },
              ],
            },
            requestedNumberOfResults: 1,
          },
        });
        return test.data.getAnythingByFilters;
      }),
    ).then(result => this.flattenArraysAndRemoveDuplicates(result));
  };

  createSearchTags = searchTagsField => {
    let tags = [];
    tags = searchTagsField.split(/[ ,]+/);

    return tags;
  };

  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
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
    } = this.state;

    return (
      <div className={classes.container}>
        <SearchField
          searchTagsField={searchTagsField}
          runSearch={this.runSearch}
          handleChange={this.handleChange}
        />

        <Grid container spacing={16}>
          {myCircles.length ? (
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <SearchResults
                title={'My World'}
                icon={<FontIcon>account_circle</FontIcon>}
                circles={myCircles}
                secondary={true}
                dense={false}
              />
            </Grid>
          ) : null}
          {myEditableCircles.length ? (
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <SearchResults
                title={'My Editable Worlds'}
                icon={<FontIcon>account_circle</FontIcon>}
                circles={myEditableCircles}
                secondary={true}
                dense={false}
              />
            </Grid>
          ) : null}
          {myViewableCircles.length ? (
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <SearchResults
                title={'My Viewable Worlds'}
                icon={<FontIcon>account_circle</FontIcon>}
                circles={myViewableCircles}
                secondary={true}
                dense={false}
              />
            </Grid>
          ) : null}
          {allResults.length ? (
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <SearchResults
                title={'All Worlds'}
                icon={<FontIcon>public</FontIcon>}
                circles={allResults}
                secondary={true}
                dense={false}
              />
            </Grid>
          ) : null}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
