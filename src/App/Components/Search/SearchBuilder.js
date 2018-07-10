import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SearchResults from './Components/SearchResults/SearchResults';
import FontIcon from '../FontIcon';

import { CURSOR } from '../../../utils/constants/cursor';
import { Grid, Paper } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

const styles = { container: {} };

class SearchBuilder extends React.Component {
  static propTypes = {
    circle: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.timeout = 0;
  }

  componentWillMount() {
    const timeout = this.props.index * 200 + this.props.index === 0 ? 0 : 200;
    this.timeout = setTimeout(() => {
      this.show();
    }, timeout);
  }

  show = () => {
    this.setState({ show: true });
  };

  showMore = () => {
    // query(this.props.circle.object.cursor.endCursor);
  };

  render() {
    const { classes, circle, index } = this.props;
    const { show } = this.state;
    if (!show) return null;
    if (!circle.lines.length) return null;

    return (
      <Grid item xs={12} md={6} lg={4} xl={3} key={circle.uid}>
        <Grow
          in={show}
          style={{ transformOrigin: '0 0 0' }}
          {...(show ? { timeout: 500 } : {})}
        >
          <div>
            <SearchResults
              title={circle.title}
              icon={<FontIcon>{circle.icon}</FontIcon>}
              circles={circle.lines}
              secondary={true}
              dense={false}
              showMore={circle.object.cursor.moreResults === CURSOR.moreResults}
              getMore={this.showMore}
            />
          </div>
        </Grow>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchBuilder);
