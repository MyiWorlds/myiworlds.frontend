import Grid from 'material-ui/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../Bar';
import { withStyles } from 'material-ui/styles';
import FontIcon from '../FontIcon';
import sizeMe from 'react-sizeme';
import { ListItem } from '../List';
import { withTheme } from 'material-ui/styles';
import getComponentSize from '../../functions/getComponentSize';
import ComponentController from '../ComponentController';

const listDisplayTypes = [
  {
    id: 'default-display',
    type: 'MEDIA_CARD',
    settings: {
      appBar: {
        spacing: 16,
        listIcon: 'list',
        media: {
          id: 'media1',
          type: 'FONT_ICON',
          style: {
            fontSize: '32px',
            transform: 'rotate(90deg)',
          },
          string: 'view_module',
        },
        cardSizes: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 4,
          xl: 4,
        },
      },
      card: {
        settings: {
          raised: false,
          margin: props =>
            props.type === props.circle.type ? { margin: '12px' } : '',
        },
        style: {
          height: '350px',
          display: 'flex',
          flexDirection: 'column',
        },
      },
      media: {
        id: 'media2',
        style: {
          height: 200,
        },
      },
      title: {
        settings: {
          type: 'headline',
          component: 'h2',
        },
      },
      description: {
        settings: {
          component: 'p',
        },
      },
      actions: {
        style: {
          width: '100%',
        },
        lines: [
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'Select',
          },
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'learn more',
          },
        ],
      },
    },
  },
  {
    type: 'LIST_CUSTOM',
    settings: {
      appBar: {
        spacing: 16,
        media: {
          id: 'media3',
          type: 'FONT_ICON',
          style: {
            fontSize: '32px',
          },
          string: 'view_stream',
        },
        cardSizes: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 6,
          xl: 6,
        },
      },
      card: {
        style: {
          minWidth: 345,
        },
        settings: {
          raised: false,
        },
      },
      media: {
        id: 'media4',
        style: {
          height: 300,
        },
      },
      title: {
        settings: {
          type: 'headline',
          component: 'h2',
        },
      },
      description: {
        settings: {
          component: 'p',
        },
      },
      actions: {
        style: {
          width: '100%',
        },
        lines: [
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'Select',
          },
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'learn more',
          },
        ],
      },
    },
  },
  {
    type: 'MEDIA_CARD',
    settings: {
      appBar: {
        spacing: 16,
        media: {
          id: 'media5',
          type: 'FONT_ICON',
          style: {
            fontSize: '32px',
            transform: 'rotate(180deg)',
          },
          string: 'view_list',
        },
        cardSizes: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      },
      card: {
        settings: {
          raised: false,
        },
      },
      media: {
        id: 'media6',
        style: {
          height: 400,
        },
      },
      title: {
        settings: {
          type: 'headline',
          component: 'h2',
        },
      },
      description: {
        settings: {
          component: 'p',
        },
      },
      actions: {
        style: {
          width: '100%',
        },
        lines: [
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'Select',
          },
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'learn more',
          },
        ],
      },
    },
  },
  {
    type: 'MEDIA_CARD',
    settings: {
      appBar: {
        spacing: 16,
        media: {
          id: 'media7',
          type: 'FONT_ICON',
          style: {
            fontSize: '32px',
          },
          string: 'list',
        },
        cardSizes: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      },
      card: {
        style: {
          minWidth: 345,
        },
        settings: {
          raised: false,
        },
      },
      media: {
        id: 'media8',
        style: {
          height: 200,
          width: 175,
          float: 'right',
          margin: '12px 12px 0px 12px',
        },
      },
      title: {
        settings: {
          type: 'headline',
          component: 'h2',
        },
      },
      description: {
        settings: {
          component: 'p',
        },
      },
      actions: {
        style: {
          width: '100%',
        },
        lines: [
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'Select',
          },
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'learn more',
          },
        ],
      },
    },
  },
  {
    type: 'MEDIA_CARD',
    settings: {
      appBar: {
        spacing: 16,
        media: {
          id: 'media9',
          type: 'FONT_ICON',
          style: {
            fontSize: '32px',
          },
          string: 'view_module',
        },
        cardSizes: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      },
      card: {
        style: {
          minWidth: 345,
          position: 'relative',
        },
        settings: {
          raised: false,
        },
      },
      media: {
        id: 'media10',
        style: {
          float: 'left',
          height: 64,
          width: 64,
          margin: '8px 8px 0px 8px',
        },
      },
      title: {
        settings: {
          type: 'headline',
          component: 'h2',
        },
      },
      description: {
        settings: {
          component: 'p',
        },
      },
      actions: {
        style: {
          width: '100%',
        },
        lines: [
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'Select',
          },
          {
            type: 'BUTTON',
            settings: {
              color: 'primary',
              dense: 'true',
            },
            string: 'learn more',
          },
        ],
      },
      // actions: {
      //   style: {
      //     float: 'right',
      //     position: 'absolute',
      //     flexDirection: 'row-reverse',
      //     right: 0,
      //     top: 0,
      //   },
      //   lines: [
      //     {
      //       type: 'RADIO',
      //       settings: {
      //         color: 'primary',
      //         dense: 'true',
      //       },
      //       style: {},
      //       string: 'Select',
      //     },
      //     {
      //       style: {
      //         display: 'none',
      //       },
      //       settings: {
      //         color: 'primary',
      //         dense: 'true',
      //       },
      //       string: 'learn more',
      //     },
      //   ],
      // },
    },
  },
];

const optionsBar = {
  flexDirection: 'row-reverse',
  background: 'none',
  padding: 4,
};

const style = {
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
    selectedCircle: PropTypes.object,
    children: PropTypes.node,
    style: PropTypes.object,
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
      (this.props.circle &&
      this.props.circle.styles &&
      this.props.circle.styles.listDisplayTypes
        ? this.props.circle.styles.length - 1
        : listDisplayTypes.length - 1)
    ) {
      currentNumber = 0;
    } else {
      currentNumber++;
    }
    this.setState({ listTypeId: currentNumber });
  };

  render() {
    const { classes } = this.props;

    const listSettings =
      this.props.circle &&
      this.props.circle.styles &&
      this.props.circle.styles.appBar &&
      this.props.circle.styles.appBar.listDisplayTypes
        ? this.props.circle.styles.listDisplayTypes[this.state.listTypeId]
        : listDisplayTypes[this.state.listTypeId];

    const cardColumns = getComponentSize(
      this.props.size.width,
      listSettings.settings.appBar.cardSizes,
    );
    return (
      <div>
        {this.props.hideOptions ? null : (
          <Bar
            flexDirection={
              this.props.circle &&
              this.props.circle.styles &&
              this.props.circle.styles.appBar &&
              this.props.circle.styles.optionsBar
                ? this.props.circle.styles.optionsBar.flexDirection
                : optionsBar.flexDirection
            }
            background={
              this.props.circle &&
              this.props.circle.styles &&
              this.props.circle.styles.optionsBar
                ? this.props.circle.styles.optionsBar.background
                : optionsBar.background
            }
            padding={
              this.props.circle &&
              this.props.circle.styles &&
              this.props.circle.styles.optionsBar
                ? this.props.circle.styles.optionsBar.padding
                : optionsBar.padding
            }
            dividerBottom={true}
          >
            <div className={classes.headerRight}>
              <FontIcon
                button={true}
                style={listSettings.settings.appBar.media.style}
                icon={listSettings.settings.appBar.media.string}
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
          {this.props.circles.map(circle => {
            return (
              <ListItem key={circle.id} xs={cardColumns}>
                <ComponentController
                  key={circle.id}
                  circle={circle}
                  settings={listDisplayTypes[this.state.listTypeId].settings}
                  type={this.props.listType || null}
                  {...this.props}
                />
              </ListItem>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withTheme()(withStyles(style)(sizeMe()(List)));
