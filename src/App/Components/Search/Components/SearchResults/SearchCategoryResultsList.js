import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Grow,
  Card,
  Avatar,
  Divider,
  CardContent,
  withStyles,
  CardHeader,
  IconButton,
  CardActions,
  Button,
} from '@material-ui/core';
import FontIcon from '../../../FontIcon';
import { CURSOR } from '../../../../../utils/constants/cursor';
import mergeDuplicateCircles from '../../../../functions/mergeDuplicateCircles';
import searchLinesFuse from '../../../../functions/searchLinesFuse';
import SearchResults from './SearchResults';

const styles = theme => ({
  container: {
    padding: 8,
  },
  avatar: {
    background: 'none',
  },
});

const SearchCategoryResultList = ({
  circle,
  classes,
  dense,
  gridSize,
  searchFieldString,
  secondary,
  showMoreResults,
}) => {
  if (circle && circle.lines && circle.lines.length) {
    return (
      <div className={classes.container}>
        <Grid container spacing={16}>
          {circle.lines.map(circle => {
            const moreResultsCurors = circle.lines.filter(circle => {
              return circle.settings.cursor.moreResults === CURSOR.moreResults;
            });

            let lines = [];
            circle.lines.forEach(circle => {
              lines = lines.concat(circle.lines);
            });
            lines = mergeDuplicateCircles(lines);

            // lines = searchLinesFuse(lines, searchFieldString);

            return (
              <Grid
                key={circle.uid}
                item
                sm={gridSize.sm}
                md={gridSize.md}
                lg={gridSize.lg}
              >
                <Grow
                  in={true}
                  timeout={500}
                  style={{ transformOrigin: '50% 0' }}
                  // {...(true ? { timeout: 500 } : {})}
                >
                  <div>
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="Recipe"
                            className={classes.avatar}
                          >
                            {(
                              <FontIcon color="action">{circle.icon}</FontIcon>
                            ) || <FontIcon>access_time</FontIcon>}
                          </Avatar>
                        }
                        action={
                          <div>
                            <IconButton aria-label="More options">
                              <FontIcon>more_vert</FontIcon>
                            </IconButton>
                          </div>
                        }
                        title={circle.title}
                      />
                      <Divider />

                      <CardContent style={{ padding: 0 }}>
                        {lines ? (
                          <SearchResults lines={lines} index={Math.random()} />
                        ) : null}
                      </CardContent>
                      <CardActions
                        className={classes.actions}
                        disableActionSpacing
                      >
                        {moreResultsCurors.length ? (
                          <Button
                            style={{ flex: 1 }}
                            onClick={() => {
                              showMoreResults(circle);
                            }}
                          >
                            Show More
                          </Button>
                        ) : null}
                      </CardActions>
                    </Card>
                  </div>
                </Grow>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
  return null;
};

SearchCategoryResultList.protoTypes = {
  circle: PropTypes.object,
  gridSize: PropTypes.object,
  showMoreResults: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchCategoryResultList);
