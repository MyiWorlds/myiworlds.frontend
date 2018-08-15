import React from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
  withStyles,
} from '@material-ui/core';
import FontIcon from '../../../FontIcon';

const styles = {
  cardContainers: {
    padding: '0 8px',
    width: '100%',
  },
  btnIcon: {
    marginRight: 4,
  },
  primarySearchActions: {
    padding: 8,
  },
};

const SearchSettings = ({
  allResults,
  classes,
  handleChange,
  resultsDense,
  resultsShowSecondary,
  myCreations,
  myEditable,
  myViewable,
  updateGridSize,
  updateSearchCategories,
}) => {
  return (
    <div>
      <Divider />
      <div className={classes.primarySearchActions}>
        <Button>
          <FontIcon className={classes.btnIcon}>view_list</FontIcon>
          List Style
        </Button>
        <Button onClick={() => updateGridSize()} style={{ cursor: 'pointer' }}>
          <FontIcon className={classes.btnIcon}>dashboard</FontIcon>
          Edit Layout
        </Button>
      </div>

      <Divider />

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<FontIcon>expand_more</FontIcon>}>
          <Typography>More Search Settings</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
          <div className={classes.cardContainers}>
            <br />
            <Typography variant="subheading">
              Results Display Options
            </Typography>
            <br />
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={resultsShowSecondary}
                    onChange={() =>
                      handleChange({
                        resultsShowSecondary: !resultsShowSecondary,
                      })
                    }
                    value="dense"
                  />
                }
                label="Show Secondary"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={resultsDense}
                    onChange={() =>
                      handleChange({ resultsDense: !resultsDense })
                    }
                    value="dense"
                  />
                }
                label="Dense"
              />
            </FormGroup>
            <br />
            <Typography variant="subheading">Categories Displayed</Typography>
            <br />
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
            </FormGroup>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

SearchSettings.protoTypes = {
  allResults: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  myCreations: PropTypes.bool.isRequired,
  myEditable: PropTypes.bool.isRequired,
  myViewable: PropTypes.bool.isRequired,
  resultsDense: PropTypes.bool.isRequired,
  resultsShowSecondary: PropTypes.bool.isRequired,
  updateGridSize: PropTypes.func.isRequired,
  updateSearchCategories: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchSettings);
