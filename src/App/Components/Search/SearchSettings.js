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
  updateSearchSettings,
  getMyCreations,
  getMyViewable,
  getMyEditable,
  getAllResults,
}) => {
  return (
    <div className={classes.cardContainers}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={getMyCreations}
              onChange={() =>
                updateSearchSettings({ getMyCreations: !getMyCreations })
              }
              value="dense"
            />
          }
          label="My Creations"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={getMyViewable}
              onChange={() =>
                updateSearchSettings({ getMyViewable: !getMyViewable })
              }
              value="dense"
            />
          }
          label="My Editable"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={getMyEditable}
              onChange={() =>
                updateSearchSettings({ getMyEditable: !getMyEditable })
              }
              value="dense"
            />
          }
          label="My Viewable"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={getAllResults}
              onChange={() =>
                updateSearchSettings({ getAllResults: !getAllResults })
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
        <Button>
          <FontIcon className={classes.btnIcon}>dashboard</FontIcon>
          Edit Layout
        </Button>
      </FormGroup>
    </div>
  );
};

SearchSettings.protoTypes = {
  updateSearchSettings: PropTypes.func.isRequired,
  getMyCreations: PropTypes.bool.isRequired,
  getMyViewable: PropTypes.bool.isRequired,
  getMyEditable: PropTypes.bool.isRequired,
  getAllResults: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SearchSettings);
