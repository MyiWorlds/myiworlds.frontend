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
      allResultsNew: [],
      allResults: [],
    };
    this.timeout = 0;
  }

  handleChange = event => {
    this.setState({
      searchTagsField: event.target.value,
    });

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
    }, 300);
  };

  createSearchTags = searchTagsField => {
    let tags = [];
    tags = searchTagsField.split(/[ ,]+/);

    return tags;
  };

  search = async () => {
    let tagsToSearch = this.createSearchTags(this.state.searchTagsField);
    let myCircles = [];
    let myEditableCircles = [];
    let myViewableCircles = [];
    let allResultsNew = [];

    if (this.state.lastSearch.length) {
      tagsToSearch = tagsToSearch.filter(
        tag => !this.state.lastSearch.includes(tag) || tag !== '',
      );
    }

    const allCircles = await this.getLines(tagsToSearch);

    // Or move this to the searchBuilder
    allCircles.forEach(query => {
      const circ1 = query.lines.find(circle => circle.uid === 'My-Creations');
      const circ2 = query.lines.find(
        circle => circle.uid === 'My-Editable-Circles',
      );
      const circ3 = query.lines.find(
        circle => circle.uid === 'MyViewableCircles',
      );
      const circ4 = query.lines.find(circle => circle.uid === 'All-Results');

      circ1 ? myCircles.push(circ1.lines) : null;
      circ2 ? myEditableCircles.push(circ2.lines) : null;
      circ3 ? myViewableCircles.push(circ3.lines) : null;
      circ4 ? allResultsNew.push(circ4.lines) : null;
    });

    // TODO: ADD THIS BACK SOMEWHERE
    // Where I merge the results (for querying different tags)
    // Also add back flattenArraysAndRemoveDuplicates at lower level

    // Need to remove all data coming from allResults, or just pass them as props
    this.setState({
      lastSearch: tagsToSearch,
      allResults: allCircles,
      myCircles: myCircles,
      myEditableCircles: myEditableCircles,
      myViewableCircles: myViewableCircles,
      allResultsNew: allResultsNew,
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
      myEditableCircles,
      myViewableCircles,
      allResultsNew,
      allResults,
      getMyCreations,
      getMyViewable,
      getMyEditable,
      getAllResults,
    } = this.state;

    const lines = allResults;
    const secondLines = [
      myCircles,
      myEditableCircles,
      myViewableCircles,
      allResultsNew,
    ];

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

// const data = {
//   type: 'QUERIES',
//   lines: [
//     {
//       title: 'QUERY 1',
//       lines: [
//         {
//           type: 'QUERY',
//           settings: {
//             filters: [
//               {
//                 property: 'creator',
//                 condition: '=',
//                 value: user.uid,
//               },
//               {
//                 property: 'tags',
//                 condition: '=',
//                 value: tag1,
//               },
//             ],
//           },
//           lines: [{}, {}, {}, {}],
//         },
//         {
//           type: 'QUERY',
//           settings: {
//             filters: [
//               {
//                 property: 'editors',
//                 condition: '=',
//                 value: user.uid,
//               },
//               {
//                 property: 'tags',
//                 condition: '=',
//                 value: tag1,
//               },
//             ],
//           },
//           lines: [{}, {}, {}, {}],
//         },
//         {
//           type: 'QUERY',
//           settings: {
//             filters: [
//               {
//                 property: 'viewers',
//                 condition: '=',
//                 value: user.uid,
//               },
//               {
//                 property: 'tags',
//                 condition: '=',
//                 value: tag1,
//               },
//             ],
//           },
//           lines: [{}, {}, {}, {}],
//         },
//       ],
//     },
//     {
//       title: 'QUERY 2',
//       lines: [
//         {
//           type: 'QUERY',
//           settings: {
//             filters: [
//               {
//                 property: 'creator',
//                 condition: '=',
//                 value: user.uid,
//               },
//               {
//                 property: 'tags',
//                 condition: '=',
//                 value: tag,
//               },
//             ],
//           },
//           lines: [{}, {}, {}, {}],
//         },
//         {
//           type: 'QUERY',
//           settings: {
//             filters: [
//               {
//                 property: 'editors',
//                 condition: '=',
//                 value: user.uid,
//               },
//               {
//                 property: 'tags',
//                 condition: '=',
//                 value: tag,
//               },
//             ],
//           },
//           lines: [{}, {}, {}, {}],
//         },
//         {
//           type: 'QUERY',
//           settings: {
//             filters: [
//               {
//                 property: 'viewers',
//                 condition: '=',
//                 value: user.uid,
//               },
//               {
//                 property: 'tags',
//                 condition: '=',
//                 value: tag,
//               },
//             ],
//           },
//           lines: [{}, {}, {}, {}],
//         },
//       ],
//     },
//     },
//   ],
// };
