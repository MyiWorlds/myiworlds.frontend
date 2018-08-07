import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

const SearchResults = ({ lines }) => {
  // lines = mergeDuplicateCircles(lines);

  return (
    <List dense={true}>
      {lines.map(circle => (
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
              true //TODO: change
                ? circle.tags
                  ? circle.tags.map((tag, index) => (
                      <span key={index}> {tag},</span>
                    ))
                  : null
                : null
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

SearchResults.protoTypes = {
  circle: PropTypes.object,
  gridSize: PropTypes.object,
};

export default SearchResults;
