import Grid from 'material-ui/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../Bar';
import { withStyles } from 'material-ui/styles';
import FontIcon from '../FontIcon';
import sizeMe from 'react-sizeme';
import { ListItem } from '../../reactComponents/List';
import { withTheme } from 'material-ui/styles';
import MediaCard from './MediaCard';
import CustomCard from './CustomCard';
import getComponentSize from '../../functions/getComponentSize';

const styles = {
  grid: {
    padding: '42px 8px 64px 12px',
    width: '100%',
    margin: 0,
  },
  card: {
    maxWidth: 345,
  },
  largeGrid: {
    height: 200,
  },
  headerLeft: {
    flex: 1,
    padding: '8px',
  },
  headerRight: {
    justifyContent: 'flex-end',
    display: 'flex',
  },
};

class List extends React.Component {
  static propTypes = {
    selectedType: PropTypes.string,
    children: PropTypes.node,
    styles: PropTypes.object,
    spacing: PropTypes.number,
    className: PropTypes.string,
    list: PropTypes.object,
    handleSingleSelection: PropTypes.func,
    hideOptions: PropTypes.bool,
  };

  state = {
    listTypeId: 0,
  };

  switchListType = () => {
    let currentNumber = this.state.listTypeId;
    if (
      this.state.listTypeId >=
      this.props.circle.settings.listDisplayTypes.length - 1
    ) {
      currentNumber = 0;
    } else {
      currentNumber++;
    }
    this.setState({ listTypeId: currentNumber });
  };

  render() {
    const { classes } = this.props;

    const listSettings = this.props.circle.settings.listDisplayTypes[
      this.state.listTypeId
    ];

    const cardColumns = getComponentSize(
      this.props.size.width,
      listSettings.settings.cardSizes,
    );
    return (
      <div>
        {this.props.hideOptions ? null : (
          <Bar
            flexDirection={this.props.circle.settings.optionsBar.flexDirection}
            background={this.props.circle.settings.optionsBar.background}
            padding={this.props.circle.settings.optionsBar.padding}
            dividerBottom={true}
          >
            <div className={classes.headerRight}>
              <FontIcon
                button={true}
                style={listSettings.settings.media.styles}
                icon={listSettings.settings.media.string}
                onClick={this.switchListType}
              />
            </div>
          </Bar>
        )}
        <Grid
          className={classes.grid}
          container={true}
          justify={this.props.justify || null}
          spacing={listSettings.settings.spacing}
        >
          {this.props.circle.lines.map(circle => {
            return (
              <ListItem key={circle._id} xs={cardColumns}>
                {(() => {
                  switch (listSettings.type) {
                    case 'MEDIA_CARD':
                      return (
                        <MediaCard
                          circle={circle}
                          settings={listSettings}
                          selectedType={this.props.selectedType}
                          handleSingleSelection={
                            this.props.handleSingleSelection
                          }
                        />
                      );
                    default:
                      return (
                        // Currently this is the same component as MediaCard
                        <CustomCard
                          circle={circle}
                          settings={listSettings}
                          selectedType={this.props.selectedType}
                          handleSingleSelection={
                            this.props.handleSingleSelection
                          }
                        />
                      );
                  }
                })()}
              </ListItem>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withTheme()(withStyles(styles)(sizeMe()(List)));
