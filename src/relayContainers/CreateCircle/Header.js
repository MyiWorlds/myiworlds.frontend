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
  title: 'Select a Type of content to create',
  type: 'LINES',
  settings: {
    optionsBar: {
      flexDirection: 'row-reverse',
      background: 'none',
      padding: 4,
    },
  },
  style: [],
  lines: [
    {
      id: '1',
      type: 'TYPE',
      title: 'Text',
      description: 'A image',
      string: 'PLAIN_TEXT',
      media: {
        id: 'media1',
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
      id: '2',
      type: 'TYPE',
      title: 'Image',
      description: 'A image',
      string: 'IMAGE',
      media: {
        id: 'media2',
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
      id: '3',
      type: 'TYPE',
      title: 'Video',
      description: 'A video',
      string: 'VIDEO_YOUTUBE',
      media: {
        id: 'media3',
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
      id: '4',
      type: 'TYPE',
      title: 'Gif',
      description: 'A gif',
      string: 'GIF',
      media: {
        id: 'media4',
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
      id: '5',
      type: 'TYPE',
      title: 'Header',
      description: 'A image',
      string: 'HEADER',
      media: {
        id: 'media5',
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
      id: '6',
      type: 'TYPE',
      title: 'Hero',
      description: 'A image',
      string: 'HERO',
      media: {
        id: 'media6',
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
      id: '7',
      type: 'TYPE',
      title: 'Custom',
      description: 'A image',
      string: 'CUSTOM',
      media: {
        id: 'media7',
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

const style = theme => ({
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
    id: 'media90',
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
    selectedCircle: this.props,
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
    this.setState(updateKeyValueString('selectedCircle', value));
  };

  updateParentTypeSelection = () => {
    this.setState({ showSelectTypeDialog: false });
    this.props.handleStateStringChange('type', this.state.selectedCircle);
  };

  humanizeType = type => {
    return type.split('_').join(' ');
  };

  render() {
    const user = this.props.user;
    const { classes } = this.props;
    const { headerMenu, showSelectTypeDialog } = this.state;
    const humanizedType = this.humanizeType(this.props.type);
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
                style={{ marginLeft: 20 }}
                onClick={this.keyValueTrue('showSelectTypeDialog')}
              >
                {this.props.type === '' ? 'Choose' : humanizedType}
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
            disablePrimary={this.state.selectedCircle === ''}
            dialogTitle={`${creationTypes.title} ${
              this.state.selectedCircle.title
            }`}
          >
            <List
              spacing={16}
              listType={'MEDIA_CARD'}
              circles={creationTypes.lines}
              selectedCircle={this.state.selectedCircle}
              handleSingleSelection={this.handleTypeSelection}
            />
          </Dialog>
        ) : null}
      </div>
    );
  }
}

export default withStyles(style)(Header);
