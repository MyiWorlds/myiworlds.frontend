import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import FontIcon from '../FontIcon';

const styles = {
  cardContainers: {
    padding: 8,
  },
  btnIcon: {
    marginRight: 4,
  },
};

const SearchSettings = ({
  classes,
  updateSearchCategories,
  myCreations,
  myViewable,
  myEditable,
  allResults,
  updateGridSize,
}) => {
  return (
    <div className={classes.cardContainers}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={myCreations}
              onChange={() =>
                updateSearchCategories({ myCreations: !myCreations })
              }
              value="dense"
            />
          }
          label="My Creations"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={myEditable}
              onChange={() =>
                updateSearchCategories({ myEditable: !myEditable })
              }
              value="dense"
            />
          }
          label="My Editable"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={myViewable}
              onChange={() =>
                updateSearchCategories({ myViewable: !myViewable })
              }
              value="dense"
            />
          }
          label="My Viewable"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={allResults}
              onChange={() =>
                updateSearchCategories({ allResults: !allResults })
              }
              value="dense"
            />
          }
          label="All Results"
        />
        <Button>
          <FontIcon className={classes.btnIcon}>view_list</FontIcon>
          List Style
        </Button>
        <Button onClick={() => updateGridSize()}>
          <FontIcon className={classes.btnIcon}>dashboard</FontIcon>
          Edit Layout
        </Button>
      </FormGroup>
    </div>
  );
};

SearchSettings.protoTypes = {
  updateSearchCategories: PropTypes.func.isRequired,
  myCreations: PropTypes.bool.isRequired,
  myViewable: PropTypes.bool.isRequired,
  myEditable: PropTypes.bool.isRequired,
  allResults: PropTypes.bool.isRequired,
  updateGridSize: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchSettings);
