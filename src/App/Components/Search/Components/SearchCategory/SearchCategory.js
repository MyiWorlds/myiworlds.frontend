import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Grid,
  Grow,
  CardHeader,
  Card,
  Avatar,
  Divider,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from '@material-ui/core';
import FontIcon from '../../../FontIcon';
import SearchResults from '../SearchResults/SearchResults';
import Progress from '../../../Progress';

const styles = {
  cardContent: {
    padding: 0,
  },
};

class SearchCategory extends React.Component {
  static propTypes = {
    circle: PropTypes.object,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.circle.lines !== this.props.circle.lines) {
      this.setState({
        loading: false,
      });
    }
  }

  handleShowMore = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const {
      classes,
      gridSize,
      index,
      resultsDense,
      resultsShowSecondary,
      showMoreResults,
      circle,
    } = this.props;
    const { loading } = this.state;

    let cursorQueries = circle.lines.find(item => item.type === 'QUERY');

    let lines =
      circle.lines.find(circle => circle.type === 'LINES').lines || [];

    const fadeInTime = index * 100 * 2 + 500;

    return (
      <Grid
        item
        xs={gridSize.xs}
        sm={gridSize.sm}
        md={gridSize.md}
        lg={gridSize.lg}
        xl={gridSize.xl}
      >
        <Grow
          in={true}
          timeout={500}
          style={{ transformOrigin: '50% 0' }}
          {...(true ? { timeout: fadeInTime } : {})}
        >
          <div>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {<FontIcon color="action">{circle.icon}</FontIcon> || (
                      <FontIcon>access_time</FontIcon>
                    )}
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

              <CardContent className={classes.cardContent}>
                {lines ? (
                  <SearchResults
                    lines={lines}
                    resultsDense={resultsDense}
                    resultsShowSecondary={resultsShowSecondary}
                  />
                ) : null}
              </CardContent>

              <CardActions className={classes.actions} disableActionSpacing>
                {cursorQueries ? (
                  <div
                    style={{ position: 'relative', flex: 1, display: 'flex' }}
                  >
                    <Button
                      variant="outlined"
                      style={{ flex: 1 }}
                      onClick={() => {
                        this.handleShowMore();
                        showMoreResults(circle);
                      }}
                      disabled={loading}
                    >
                      Show More
                    </Button>
                    {loading && <Progress hideBackground size={24} />}
                  </div>
                ) : null}
              </CardActions>
            </Card>
          </div>
        </Grow>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchCategory);
