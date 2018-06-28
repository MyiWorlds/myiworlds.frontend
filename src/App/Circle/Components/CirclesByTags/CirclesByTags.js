import React from 'react';
import { Query } from 'react-apollo';

import { Link } from 'react-router-dom';

import GET_CIRCLES_BY_TAGS from '../../Queries/getCirclesByTags';

import Progress from '../../../Components/Progress';
import NotFound from '../../../Components/NotFound';
import {
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Card,
  Divider,
  withStyles,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
  ListItemAvatar,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import FontIcon from '../../../Components/FontIcon';
// Search after every word, remove spaces and commas.  Let everything else go
// On the frontend filter the list for the best items first
// Create algorythom on UI for easy changing.  Just interacts with query, gets it from your account
// More tags it matches higher up the list it goes, only keeps highest 10.

// The more items to search that get pasted into the text field the less it fetches for each
// 3+ words returns most recent
// Searches your own items and displays first

const styles = theme => ({
  card: {
    // maxWidth: 400,
  },
  cardContainers: {
    padding: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'red',
  },
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  listItemSettingsAction: {
    flex: 1,
    textAlign: 'center',
  },
  btnIcon: {
    marginRight: 4,
  },
});

function generate(element) {
  return [0, 1, 2, 3].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class CirclesByTags extends React.Component {
  state = {
    tags: [''],
    tagSearchField: '',
    search: false,
    circles: [],
    dense: false,
    secondary: true,
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
    const { classes } = this.props;
    const { dense, secondary } = this.state;
    const searchField = (
      <div className={classes.cardContainers}>
        <TextField
          id="tags"
          autoFocus={true}
          label="Search"
          value={this.state.tagSearchField}
          onChange={this.handleChange('tagSearchField')}
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
                className={classes.cardContainers}
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
          margin: 16,
        }}
      >
        {searchField}
        {results}
        <div className={classes.cardContainers}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dense}
                  onChange={(event, checked) =>
                    this.setState({ dense: checked })
                  }
                  value="dense"
                />
              }
              label="Dense"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={secondary}
                  onChange={(event, checked) =>
                    this.setState({ secondary: checked })
                  }
                  value="secondary"
                />
              }
              label="More text"
            />
            <Button>
              <FontIcon className={classes.btnIcon}>view_list</FontIcon>
              List Style
            </Button>
            <Button>
              <FontIcon className={classes.btnIcon}>dashboard</FontIcon>
              Edit Layout
            </Button>
          </FormGroup>
        </div>
        <Divider />
        <br />
        <br />
        <div className={classes.cardContainers}>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      <FontIcon>access_time</FontIcon>
                    </Avatar>
                  }
                  action={
                    <div>
                      {/* <IconButton aria-label="More options">
                        <FontIcon>drag_handle</FontIcon>
                      </IconButton> */}
                      <IconButton aria-label="More options">
                        <FontIcon>more_vert</FontIcon>
                      </IconButton>
                    </div>
                  }
                  title="My Recents"
                  // subheader="September 14, 2016"
                />
                <Divider />
                <CardContent style={{ padding: 0 }}>
                  <List dense={dense}>
                    {generate(
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="A nodes title"
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        {/* <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      </ListItem>,
                    )}
                  </List>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Button style={{ flex: 1 }}>Show More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      MW
                    </Avatar>
                  }
                  action={
                    <div>
                      {/* <IconButton aria-label="More options">
                        <FontIcon>drag_handle</FontIcon>
                      </IconButton> */}
                      <IconButton aria-label="More options">
                        <FontIcon>more_vert</FontIcon>
                      </IconButton>
                    </div>
                  }
                  title="MyiWorlds"
                  // subheader="September 14, 2016"
                />
                <Divider />

                <CardContent style={{ padding: 0 }}>
                  <List dense={dense}>
                    {generate(
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="A nodes title"
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        {/* <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      </ListItem>,
                    )}
                  </List>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Button style={{ flex: 1 }}>Show More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      <FontIcon>signal_cellular_alt</FontIcon>
                    </Avatar>
                  }
                  action={
                    <div>
                      {/* <IconButton aria-label="More options">
                        <FontIcon>drag_handle</FontIcon>
                      </IconButton> */}
                      <IconButton aria-label="More options">
                        <FontIcon>more_vert</FontIcon>
                      </IconButton>
                    </div>
                  }
                  title="Popular"
                  // subheader="September 14, 2016"
                />
                <Divider />

                <CardContent style={{ padding: 0 }}>
                  <List dense={dense}>
                    {generate(
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="A nodes title"
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        {/* <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      </ListItem>,
                    )}
                  </List>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Button style={{ flex: 1 }}>Show More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      <b>#</b>
                    </Avatar>
                  }
                  action={
                    <div>
                      {/* <IconButton aria-label="More options">
                        <FontIcon>drag_handle</FontIcon>
                      </IconButton> */}
                      <IconButton aria-label="More options">
                        <FontIcon>more_vert</FontIcon>
                      </IconButton>
                    </div>
                  }
                  title="Tag that you are following"
                  subheader="Some tag (circle) that you wanted to watch"
                />
                <Divider />

                <CardContent style={{ padding: 0 }}>
                  <List dense={dense}>
                    {generate(
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="A nodes title"
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        {/* <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      </ListItem>,
                    )}
                  </List>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Button style={{ flex: 1 }}>Show More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      <FontIcon>photo</FontIcon>
                    </Avatar>
                  }
                  action={
                    <div>
                      {/* <IconButton aria-label="More options">
                        <FontIcon>drag_handle</FontIcon>
                      </IconButton> */}
                      <IconButton aria-label="More options">
                        <FontIcon>more_vert</FontIcon>
                      </IconButton>
                    </div>
                  }
                  title="Has"
                  subheader="This is some Node in the graph which you added to your account"
                />
                <Divider />

                <CardContent style={{ padding: 0 }}>
                  <List dense={dense}>
                    {generate(
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="A nodes title"
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        {/* <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      </ListItem>,
                    )}
                  </List>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Button style={{ flex: 1 }}>Show More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      <FontIcon>photo</FontIcon>
                    </Avatar>
                  }
                  action={
                    <div>
                      {/* <IconButton aria-label="More options">
                        <FontIcon>drag_handle</FontIcon>
                      </IconButton> */}
                      <IconButton aria-label="More options">
                        <FontIcon>more_vert</FontIcon>
                      </IconButton>
                    </div>
                  }
                  title="Some Circle"
                  subheader="This is some Node in the graph which you added to your account"
                />
                <Divider />

                <CardContent style={{ padding: 0 }}>
                  <List dense={dense}>
                    {generate(
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="A nodes title"
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        {/* <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      </ListItem>,
                    )}
                  </List>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Button style={{ flex: 1 }}>Show More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      <FontIcon>photo</FontIcon>
                    </Avatar>
                  }
                  action={
                    <div>
                      {/* <IconButton aria-label="More options">
                        <FontIcon>drag_handle</FontIcon>
                      </IconButton> */}
                      <IconButton aria-label="More options">
                        <FontIcon>more_vert</FontIcon>
                      </IconButton>
                    </div>
                  }
                  title="Some Circle"
                  subheader="This is some Node in the graph which you added to your account"
                />
                <Divider />

                <CardContent style={{ padding: 0 }}>
                  <List dense={dense}>
                    {generate(
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="A nodes title"
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        {/* <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      </ListItem>,
                    )}
                  </List>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Button style={{ flex: 1 }}>Show More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      <FontIcon>photo</FontIcon>
                    </Avatar>
                  }
                  action={
                    <div>
                      {/* <IconButton aria-label="More options">
                        <FontIcon>drag_handle</FontIcon>
                      </IconButton> */}
                      <IconButton aria-label="More options">
                        <FontIcon>more_vert</FontIcon>
                      </IconButton>
                    </div>
                  }
                  title="Some Circle"
                  subheader="This is some Node in the graph which you added to your account"
                />
                <Divider />

                <CardContent style={{ padding: 0 }}>
                  <List dense={dense}>
                    {generate(
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="A nodes title"
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        {/* <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      </ListItem>,
                    )}
                  </List>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Button style={{ flex: 1 }}>Show More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(CirclesByTags);
