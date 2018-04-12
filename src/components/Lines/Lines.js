import React from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';

const Lines = props => {
  return (
    <List component="nav">
      {props.lines.length
        ? props.lines.map((circle, index) => {
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
                      circle.type +
                      (circle.tags && circle.tags.length
                        ? circle.tags.map(tag => tag)
                        : null)
                    }
                  />
                </ListItem>
              </div>
            );
          })
        : null}
    </List>
  );
};

Lines.prototype.propTypes = {
  lines: PropTypes.array,
};

export default Lines;
