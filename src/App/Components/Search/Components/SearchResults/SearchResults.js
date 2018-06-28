import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  withStyles,
  TextField,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  CardActions,
  Button,
  ListItemText,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import FontIcon from '../../../FontIcon';

const styles = {
  container: {
    padding: 12,
  },
};

class SearchResults extends React.Component {
  static propTypes = {
    circles: PropTypes.array,
    title: PropTypes.string,
    icon: PropTypes.node,
    dense: PropTypes.bool,
  };

  state = {};

  render() {
    const { classes, circles, title, icon, dense, secondary } = this.props;

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {icon || <FontIcon>access_time</FontIcon>}
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
            title={title}
            // subheader="September 14, 2016"
          />
          <Divider />
          <CardContent style={{ padding: 0 }}>
            <List dense={dense}>
              {circles
                ? circles.map(circle => {
                    return (
                      <ListItem
                        button
                        key={circle.uid}
                        component={Link}
                        to={`/uid/${circle.uid}`}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={circle.title}
                          secondary={
                            secondary
                              ? circle.tags
                                ? circle.tags.map((tag, index) => (
                                    <span key={index}> {tag},</span>
                                  ))
                                : null
                              : null
                          }
                        />
                      </ListItem>
                    );
                  })
                : null}
            </List>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button style={{ flex: 1 }}>Show More</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SearchResults);
