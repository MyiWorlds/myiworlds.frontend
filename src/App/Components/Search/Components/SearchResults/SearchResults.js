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

const SearchResults = ({ lines, resultsDense, resultsShowSecondary }) => {
  return (
    <List dense={resultsDense}>
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
              resultsShowSecondary
                ? circle.tags
                  ? circle.tags.map((tag, index) => (
                      <span key={index}> {tag}</span>
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

SearchResults.defaultProps = {
  secondary: true,
  dense: false,
};

SearchResults.protoTypes = {
  lines: PropTypes.array,
  resultsDense: PropTypes.bool,
  resultsShowSecondary: PropTypes.bool,
};

export default SearchResults;
