import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../reactComponents/TextField';
import FormHelperText from '../../reactComponents/FormHelperText';
import Button from '../../reactComponents/Button';
import Dialog from '../../reactComponents/Dialog';
import { List } from '../../reactComponents/List';
import Bar from '../../reactComponents/Bar';
import { withStyles } from 'material-ui/styles';
import FontIcon from '../../reactComponents/FontIcon';
import updateKeyValueFalse from '../../functions/updateKeyValues/updateKeyValueFalse';
import updateKeyValueTrue from '../../functions/updateKeyValues/updateKeyValueTrue';
import updateKeyValueString from '../../functions/updateKeyValues/updateKeyValueString';
import toggleKeyValueBoolean from '../../functions/updateKeyValues/toggleKeyValueBoolean';
import { Menu, MenuItem } from '../../reactComponents/Menu';

const creationTypes = {
  type: 'LINES',
  settings: {
    optionsBar: {
      flexDirection: 'row-reverse',
      background: 'none',
      padding: 4,
    },
    listDisplayTypes: [
      {
        type: 'MEDIA_CARD',
        settings: {
          spacing: 16,
          listIcon: 'list',
          media: {
            _id: '',
            type: 'FONT_ICON',
            styles: {
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
        linesFlattend: {
          card: {
            settings: {
              raised: false,
              margin: props =>
                props.type === props.circle.type ? { margin: '12px' } : '',
            },
          },
          media: {
            _id: '',
            styles: {
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
            styles: {
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
          spacing: 16,
          media: {
            _id: '',
            type: 'FONT_ICON',
            styles: {
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
        linesFlattend: {
          card: {
            styles: {
              minWidth: 345,
            },
            settings: {
              raised: false,
            },
          },
          media: {
            _id: '',
            styles: {
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
            styles: {
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
          spacing: 16,
          media: {
            _id: '',
            type: 'FONT_ICON',
            styles: {
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
        linesFlattend: {
          card: {
            settings: {
              raised: false,
            },
          },
          media: {
            _id: '',
            styles: {
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
            styles: {
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
          spacing: 16,
          media: {
            _id: '',
            type: 'FONT_ICON',
            styles: {
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
        linesFlattend: {
          card: {
            styles: {
              minWidth: 345,
            },
            settings: {
              raised: false,
            },
          },
          media: {
            _id: '',
            styles: {
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
            styles: {
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
          spacing: 16,
          media: {
            _id: '',
            type: 'FONT_ICON',
            styles: {
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
        linesFlattend: {
          card: {
            styles: {
              minWidth: 345,
              position: 'relative',
            },
            settings: {
              raised: false,
            },
          },
          media: {
            _id: '',
            styles: {
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
            styles: {
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
          //   styles: {
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
          //       styles: {},
          //       string: 'Select',
          //     },
          //     {
          //       styles: {
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
    ],
  },
  styles: [],
  title: 'Select a Type of content to create',
  lines: [
    {
      _id: '1',
      type: 'PLAIN_TEXT',
      title: 'Text',
      description: 'A image',
      media: {
        _id: '',
        title: 'Image Title',
        type: 'IMAGE',
        blob: {
          small:
            'https://support.squarespace.com/hc/en-us/article_attachments/216947387/blogpage.png',
          medium:
            'https://support.squarespace.com/hc/en-us/article_attachments/216947387/blogpage.png',
          large:
            'https://support.squarespace.com/hc/en-us/article_attachments/216947387/blogpage.png',
          xlarge:
            'https://support.squarespace.com/hc/en-us/article_attachments/216947387/blogpage.png',
        },
      },
    },
    {
      _id: '2',
      type: 'IMAGE',
      title: 'Image',
      description: 'A image',
      media: {
        _id: '',
        title: 'Image Title',
        type: 'IMAGE',
        blob: {
          small:
            'https://mymodernmet.com/wp/wp-content/uploads/2017/12/siberian-cats-alla-lebedeva-2.jpg',
          medium:
            'https://mymodernmet.com/wp/wp-content/uploads/2017/12/siberian-cats-alla-lebedeva-2.jpg',
          large:
            'https://mymodernmet.com/wp/wp-content/uploads/2017/12/siberian-cats-alla-lebedeva-2.jpg',
          xlarge:
            'https://mymodernmet.com/wp/wp-content/uploads/2017/12/siberian-cats-alla-lebedeva-2.jpg',
        },
      },
    },
    {
      _id: '3',
      type: 'VIDEO_YOUTUBE',
      title: 'Video',
      description: 'A video',
      media: {
        _id: '',
        title: 'Image Title',
        type: 'IMAGE',
        blob: {
          small:
            'https://cdn-images-1.medium.com/max/800/1*wvlnb8JL9_FU_AJroew_Rw.gif',
          medium:
            'https://cdn-images-1.medium.com/max/800/1*wvlnb8JL9_FU_AJroew_Rw.gif',
          large:
            'https://cdn-images-1.medium.com/max/800/1*wvlnb8JL9_FU_AJroew_Rw.gif',
          xlarge:
            'https://cdn-images-1.medium.com/max/800/1*wvlnb8JL9_FU_AJroew_Rw.gif',
        },
      },
    },
    {
      _id: '4',
      type: 'GIF',
      title: 'Gif',
      description: 'A gif',
      media: {
        _id: '',
        title: 'Gif Title',
        type: 'GIF',
        blob: {
          small:
            'https://i.pinimg.com/originals/75/4e/cf/754ecf62f036b6de554bc4c737ce3863.gif',
          medium:
            'https://i.pinimg.com/originals/75/4e/cf/754ecf62f036b6de554bc4c737ce3863.gif',
          large:
            'https://i.pinimg.com/originals/75/4e/cf/754ecf62f036b6de554bc4c737ce3863.gif',
          xlarge:
            'https://i.pinimg.com/originals/75/4e/cf/754ecf62f036b6de554bc4c737ce3863.gif',
        },
      },
    },
    {
      _id: '5',
      type: 'HEADER',
      title: 'Header',
      description: 'A image',
      media: {
        _id: '',
        title: 'Image Title',
        type: 'IMAGE',
        blob: {
          small: 'https://getmdl.io/assets/templates/text-only.jpg',
          medium: 'https://getmdl.io/assets/templates/text-only.jpg',
          large: 'https://getmdl.io/assets/templates/text-only.jpg',
          xlarge: 'https://getmdl.io/assets/templates/text-only.jpg',
        },
      },
    },
    {
      _id: '6',
      type: 'HERO',
      title: 'Hero',
      description: 'A image',
      media: {
        _id: '',
        title: 'Image Title',
        type: 'IMAGE',
        blob: {
          small: 'http://deothemes.com/envato/unika/youtube.jpg',
          medium: 'http://deothemes.com/envato/unika/youtube.jpg',
          large: 'http://deothemes.com/envato/unika/youtube.jpg',
          xlarge: 'http://deothemes.com/envato/unika/youtube.jpg',
        },
      },
    },
    {
      _id: '7',
      type: 'CUSTOM',
      title: 'Custom',
      description: 'A image',
      media: {
        _id: '',
        title: 'Image Title',
        type: 'IMAGE',
        blob: {
          small:
            'https://assets.materialup.com/uploads/dfd29b6d-156d-4043-9a31-6f66c99ad500/material_design_widgets_ui_kit.png',
          medium:
            'https://assets.materialup.com/uploads/dfd29b6d-156d-4043-9a31-6f66c99ad500/material_design_widgets_ui_kit.png',
          large:
            'https://assets.materialup.com/uploads/dfd29b6d-156d-4043-9a31-6f66c99ad500/material_design_widgets_ui_kit.png',
          xlarge:
            'https://assets.materialup.com/uploads/dfd29b6d-156d-4043-9a31-6f66c99ad500/material_design_widgets_ui_kit.png',
        },
      },
    },
  ],
};

const styles = theme => ({
  title: {
    fontFamily: 'Roboto',
    color: 'rgba(0, 0, 0, 0.45)',
    fontWeight: 400,
    fontSize: '1.2rem',
    overflow: 'hidden',
    marginRight: '8px',
  },
  header: {
    padding: '12px 12px 12px 12px',
    background: theme.palette.background.default,
    display: 'flex',
    flex: '0 0 auto',
    zIndex: 999,
  },
  media: {
    _id: '',
    height: 200,
  },
  card: {
    maxWidth: 345,
  },

  fieldsContainer: {
    margin: '0 auto',
    maxWidth: 800,
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

class Header extends React.Component {
  static propTypes = {
    handleStateEventChange: PropTypes.func.isRequired,
    handleStateStringChange: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    slugName: PropTypes.string.isRequired,
  };

  state = {
    // Does not currently toggle due to something in MUI
    headerMenu: false,
    showSelectTypeDialog: this.props.type === '' ? true : false,
    selectedType: this.props.type,
  };

  toggleBoolean = name => () => {
    this.setState(toggleKeyValueBoolean(name, this.state[name]));
  };

  keyValueTrue = name => () => {
    this.setState(updateKeyValueTrue(name));
  };

  keyValueFalse = name => () => {
    this.setState(updateKeyValueFalse(name));
  };

  handleTypeSelection = value => {
    this.setState(updateKeyValueString('selectedType', value));
  };

  updateParentTypeSelection = () => {
    this.setState({ showSelectTypeDialog: false });
    this.props.handleStateStringChange('type', this.state.selectedType);
  };

  render() {
    const user = this.props.user;
    const { classes } = this.props;
    const { headerMenu, showSelectTypeDialog } = this.state;

    return (
      <div>
        <Bar background="none" dividerBottom={true}>
          <div>
            <span className={classes.title}>
              Create
              <Button
                color="primary"
                raised
                aria-haspopup="true"
                styles={{ marginLeft: 20 }}
                onClick={this.keyValueTrue('showSelectTypeDialog')}
              >
                {this.props.type === '' ? 'Choose' : this.props.type}
                <FontIcon
                  height={16}
                  aria-label="More"
                  aria-owns={headerMenu ? 'menu-list' : null}
                  icon="arrow_drop_down"
                />
              </Button>
            </span>
          </div>
          <div style={{ flexGrow: 1 }} />
          <Button
            color="primary"
            aria-haspopup="true"
            onClick={this.keyValueTrue('showSelectTypeDialog')}
          >
            + Add Something
          </Button>

          <Menu
            closeMenu={this.keyValueFalse('headerMenu')}
            menuState={this.state.headerMenu}
            placement="bottom-end"
            style={{ flex: 1 }}
            target={
              <FontIcon
                button={true}
                aria-label="More"
                aria-owns={headerMenu ? 'menu-list' : null}
                aria-haspopup="true"
                onClick={this.toggleBoolean('headerMenu')}
                icon="more_horiz"
              />
            }
            menuItems={options.map(option => (
              <MenuItem key={option} onClick={this.keyValueFalse('headerMenu')}>
                {option}
              </MenuItem>
            ))}
          />
        </Bar>

        <form className={classes.fieldsContainer} noValidate>
          <TextField
            id="slugName"
            className={classes.textField}
            label="URL"
            margin="normal"
            value={this.props.slugName}
            fullWidth={true}
            onChange={this.props.handleSlugChange}
          />
          <FormHelperText style={{ marginLeft: 8 }}>
            A way to for you to easily find this
            <br />
            www.MyiWorlds.com/{user.username}/{this.props.slugName}
          </FormHelperText>

          <TextField
            className={classes.textField}
            id="title"
            label="Title"
            margin="normal"
            fullWidth={true}
            onChange={this.props.handleStateEventChange('title')}
          />
          <TextField
            className={classes.textField}
            id="subtitle"
            label="Subtitle"
            margin="normal"
            fullWidth={true}
            onChange={this.props.handleStateEventChange('subtitle')}
          />
          <TextField
            className={classes.textField}
            id="description"
            label="Description"
            type="description"
            margin="normal"
            fullWidth={true}
            multiline={true}
            style={{ margin: 8 }}
            onChange={this.props.handleStateEventChange('description')}
          />
          <TextField
            className={classes.textField}
            id="tags"
            label="Tags"
            type="tags"
            margin="normal"
            fullWidth={true}
            style={{ margin: 8 }}
            multiline={true}
            onChange={this.props.handleStateEventChange('tags')}
          />
          <FormHelperText style={{ marginLeft: 8 }}>
            These will be terms that allow you to find this.
          </FormHelperText>
        </form>
        {showSelectTypeDialog ? (
          <Dialog
            open={showSelectTypeDialog}
            handleCancel={this.keyValueFalse('showSelectTypeDialog')}
            handleSuccess={this.updateParentTypeSelection}
            contentShowing={this.props.contentShowing}
            disablePrimary={this.state.selectedType === ''}
            dialogTitle={`${creationTypes.title} ${this.state.selectedType}`}
          >
            <List
              spacing={16}
              circle={creationTypes}
              selectedType={this.state.selectedType}
              handleSingleSelection={this.handleTypeSelection}
            />
          </Dialog>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(Header);
