import React from 'react';
import { Query } from 'react-apollo';

import GET_CIRCLES_BY_TAGS from '../../queries/root/getCirclesByTags';

import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Card from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Progress from '../Progress';
import NotFound from '../NotFound';

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
    return (
      <Card
        style={{
          width: '400px',
          margin: '0 auto',
          padding: 8,
        }}
      >
        <div style={{ display: 'flex', width: '100%' }}>
          <TextField
            id="tags"
            label="Tags"
            value={this.state.tagSearchField}
            onChange={this.handleChange('tagSearchField')}
            margin="normal"
            style={{ width: '100%', flexGrow: 1 }}
          />
          <div>
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.runSearch()}
              style={{ flex: 1 }}
            >
              Search
            </Button>
          </div>
        </div>

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
                <Card style={{ maxWidth: '100%', margin: 8 }}>
                  <List component="nav">
                    {data.getCirclesByTags.length
                      ? data.getCirclesByTags.map((circle, index) => {
                          return (
                            <div key={circle.id}>
                              {index !== 0 ? <Divider /> : null}
                              <ListItem
                                button
                                component={({ ...props }) => (
                                  <Link to={`id/${circle._id}`} {...props} />
                                )}
                              >
                                <ListItemText
                                  primary={circle.title}
                                  secondary={
                                    circle.type + circle.tags.map(tag => tag)
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
      </Card>
    );
  }
}

export default CirclesByTags;
