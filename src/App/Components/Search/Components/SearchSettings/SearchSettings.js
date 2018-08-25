import React from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup,
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
  primarySearchActionsItem: {
    marginRight: 8,
  },
  checkButton: {
    padding: '0 16px 0px 0px',
    marginRight: 8,
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
        <Button variant="outlined" className={classes.primarySearchActionsItem}>
          <FontIcon className={classes.btnIcon}>view_list</FontIcon>
          List Style
        </Button>
        <Button
          variant="outlined"
          onClick={() => updateGridSize()}
          className={classes.primarySearchActionsItem}
        >
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
              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  handleChange({
                    resultsShowSecondary: !resultsShowSecondary,
                  })
                }
              >
                <Checkbox
                  color="primary"
                  checked={resultsShowSecondary}
                  value="dense"
                />
                Secondary Text
              </Button>

              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  handleChange({
                    resultsDense: !resultsDense,
                  })
                }
              >
                <Checkbox checked={resultsDense} value="dense" />
                Dense
              </Button>
            </FormGroup>
            <br />
            <Typography variant="subheading">Categories Displayed</Typography>
            <br />
            <FormGroup row>
              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  updateSearchCategories({ myCreations: !myCreations })
                }
              >
                <Checkbox color="primary" checked={myCreations} value="dense" />
                My Creations
              </Button>

              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  updateSearchCategories({ myEditable: !myEditable })
                }
              >
                <Checkbox color="primary" checked={myEditable} value="dense" />
                My Editable
              </Button>

              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  updateSearchCategories({ myViewable: !myViewable })
                }
              >
                <Checkbox color="primary" checked={myViewable} value="dense" />
                My Viewable
              </Button>

              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  updateSearchCategories({ allResults: !allResults })
                }
              >
                <Checkbox color="primary" checked={allResults} value="dense" />
                All Results
              </Button>
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
