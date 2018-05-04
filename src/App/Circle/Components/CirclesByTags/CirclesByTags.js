import React from 'react';
import { Query } from 'react-apollo';

import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Card from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import GET_CIRCLES_BY_TAGS from '../../Queries/getCirclesByTags';

import Progress from '../../../Components/Progress';
import NotFound from '../../../Components/NotFound';

class CirclesByTags extends React.Component {
  state = {
    tags: [''],
    tagSearchField: '',
    search: false,
    circles: [],
  };

  updateTags = tagSearchField => {
    const tags = tagSearchField.split(' ');

    this.setState({
      tags: tags,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateCircles = circles => {
    this.setState({ circles });
  };

  runSearch = () => {
    this.updateTags(this.state.tagSearchField);
  };

  render() {
    const searchField = (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <TextField
          id="tags"
          autoFocus={true}
          label="Tags"
          value={this.state.tagSearchField}
          onChange={this.handleChange('tagSearchField')}
          margin="normal"
          style={{ width: '100%', flexGrow: 1 }}
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
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.runSearch();
            }
          }}
        />
      </div>
    );

    const results = (
      <Query
        query={GET_CIRCLES_BY_TAGS}
        variables={{ tags: this.state.tags, requestedNumberOfResults: 6 }}
        skip={!this.state.tags.length}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Progress />;
          if (error) return <p>`Error :( ${error}`</p>;
          if (!data.getCirclesByTags) return <NotFound />;

          if (data.getCirclesByTags.length) {
            return (
              <Card
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'white',
                  margin: 8,
                }}
              >
                <List component="nav">
                  {data.getCirclesByTags.length
                    ? data.getCirclesByTags.map((circle, index) => {
                        if (circle.type === 'PERMISSION_DENIED') return null;

                        return (
                          <div key={circle.id}>
                            {index !== 0 ? <Divider /> : null}
                            <ListItem
                              button
                              component={Link}
                              to={`/uid/${circle.uid}`}
                            >
                              <ListItemText
                                primary={circle.title}
                                secondary={
                                  circle.type +
                                  (circle.tags
                                    ? circle.tags.map(tag => tag)
                                    : '')
                                }
                              />
                            </ListItem>
                          </div>
                        );
                      })
                    : null}
                </List>
              </Card>
            );
          }

          return null;
        }}
      </Query>
    );

    if (this.props.hideContainerCard) {
      return (
        <div
          style={{
            position: 'relative',
            width: '400px',
            margin: '0 auto',
            height: 60,
          }}
        >
          {searchField}
          {results}
        </div>
      );
    }

    return (
      <Card
        style={{
          position: 'relative',
          width: '400px',
          margin: '0 auto',
          padding: 8,
        }}
      >
        {searchField}
        {results}
      </Card>
    );
  }
}

export default CirclesByTags;
