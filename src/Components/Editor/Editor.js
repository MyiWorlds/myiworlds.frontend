import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import updateKeyValueFalse from '../../functions/updateKeyValues/updateKeyValueFalse';
import updateKeyValueTrue from '../../functions/updateKeyValues/updateKeyValueTrue';
import updateKeyValueString from '../../functions/updateKeyValues/updateKeyValueString';
import toggleKeyValueBoolean from '../../functions/updateKeyValues/toggleKeyValueBoolean';

import Switch from 'material-ui/Switch';
import Bar from '../Bar';
import Button from '../Button';
import Dialog from '../Dialog';
import { FormControlLabel } from 'material-ui/Form';
import FontIcon from '../FontIcon';
import TextField from '../TextField';
import FormHelperText from '../FormHelperText';
import { Menu, MenuItem } from '../Menu';
import { List } from '../List';
import Typography from '../Typography';

const creationTypes = {
  title: 'Select a Type of content to create',
  type: 'LINES',
  settings: {},
  style: {
    optionsBar: {
      flexDirection: 'row-reverse',
      background: 'none',
      padding: 4,
    },
  },
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
      title: 'Editor',
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
      description: 'A hero image with some custom text overlayed',
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
      title: 'JSON',
      description: 'A JSON field to put object values',
      string: 'BLOB',
      media: {
        id: 'media4',
        title: 'Blob Title',
        type: 'IMAGE',
        blob: {
          small:
            'https://lh3.googleusercontent.com/pbXlI5GfAN40IkF1n_S5vceOF_UJ-oA51mJwNxWQcfr6ZVFNkNW62kbQvenifVHMjAOxo3stCNpYhmuPndPoUpFcBsf5G3PbQEZ8Rz8LsaWMy8mMIPwGHR1S7mf5oWpg8d4U5-yISElJpNl_mH-8ocTLN9dM25x8yOPWTV_QC9tTJQL9zn_0vqG07WoqOAJaFiointfKNeN_Jt-chF_dqcQOq9Uvv9DpbBjm7S3nULsYSnaWwJTLEJHtVaVqkynVYSynfKfxo3FsqsbXMwpeuMfhduqjOkdvIBwkmHldxbpgkV0kMA2kzS8MBliZIUSebxh4lU-g8irdUwugGkHQuDkVxp68zPL9gx5ZTsd-34zxn9SOpRCahCP2Fcp1-Lz2iC_SIM-lVmmmgiVSSnfCVtPGp_KYMgbXFsr1g4-3uQ-qzD29tnF_42LL5pzqrB1o_j4rtNXV4O3Z92J77r_3hhGDjV7vGxdgZ-exqiB3-ZHOJYQvgiCRVCbGChcFoDw8e1b2fcq-Rw2qdnMWkoLVfB3nbnf6YK62IoT61gWYhNPNSNgEP_CtT0ZbpfVjHZuEfFSNyyf6N1aJqMYQ35ByPrIUQ7NzurcUQuxVj9Gt=w470-h388-no',
          medium:
            'https://lh3.googleusercontent.com/pbXlI5GfAN40IkF1n_S5vceOF_UJ-oA51mJwNxWQcfr6ZVFNkNW62kbQvenifVHMjAOxo3stCNpYhmuPndPoUpFcBsf5G3PbQEZ8Rz8LsaWMy8mMIPwGHR1S7mf5oWpg8d4U5-yISElJpNl_mH-8ocTLN9dM25x8yOPWTV_QC9tTJQL9zn_0vqG07WoqOAJaFiointfKNeN_Jt-chF_dqcQOq9Uvv9DpbBjm7S3nULsYSnaWwJTLEJHtVaVqkynVYSynfKfxo3FsqsbXMwpeuMfhduqjOkdvIBwkmHldxbpgkV0kMA2kzS8MBliZIUSebxh4lU-g8irdUwugGkHQuDkVxp68zPL9gx5ZTsd-34zxn9SOpRCahCP2Fcp1-Lz2iC_SIM-lVmmmgiVSSnfCVtPGp_KYMgbXFsr1g4-3uQ-qzD29tnF_42LL5pzqrB1o_j4rtNXV4O3Z92J77r_3hhGDjV7vGxdgZ-exqiB3-ZHOJYQvgiCRVCbGChcFoDw8e1b2fcq-Rw2qdnMWkoLVfB3nbnf6YK62IoT61gWYhNPNSNgEP_CtT0ZbpfVjHZuEfFSNyyf6N1aJqMYQ35ByPrIUQ7NzurcUQuxVj9Gt=w470-h388-no',
          large:
            'https://lh3.googleusercontent.com/pbXlI5GfAN40IkF1n_S5vceOF_UJ-oA51mJwNxWQcfr6ZVFNkNW62kbQvenifVHMjAOxo3stCNpYhmuPndPoUpFcBsf5G3PbQEZ8Rz8LsaWMy8mMIPwGHR1S7mf5oWpg8d4U5-yISElJpNl_mH-8ocTLN9dM25x8yOPWTV_QC9tTJQL9zn_0vqG07WoqOAJaFiointfKNeN_Jt-chF_dqcQOq9Uvv9DpbBjm7S3nULsYSnaWwJTLEJHtVaVqkynVYSynfKfxo3FsqsbXMwpeuMfhduqjOkdvIBwkmHldxbpgkV0kMA2kzS8MBliZIUSebxh4lU-g8irdUwugGkHQuDkVxp68zPL9gx5ZTsd-34zxn9SOpRCahCP2Fcp1-Lz2iC_SIM-lVmmmgiVSSnfCVtPGp_KYMgbXFsr1g4-3uQ-qzD29tnF_42LL5pzqrB1o_j4rtNXV4O3Z92J77r_3hhGDjV7vGxdgZ-exqiB3-ZHOJYQvgiCRVCbGChcFoDw8e1b2fcq-Rw2qdnMWkoLVfB3nbnf6YK62IoT61gWYhNPNSNgEP_CtT0ZbpfVjHZuEfFSNyyf6N1aJqMYQ35ByPrIUQ7NzurcUQuxVj9Gt=w470-h388-no',
          xlarge:
            'https://lh3.googleusercontent.com/pbXlI5GfAN40IkF1n_S5vceOF_UJ-oA51mJwNxWQcfr6ZVFNkNW62kbQvenifVHMjAOxo3stCNpYhmuPndPoUpFcBsf5G3PbQEZ8Rz8LsaWMy8mMIPwGHR1S7mf5oWpg8d4U5-yISElJpNl_mH-8ocTLN9dM25x8yOPWTV_QC9tTJQL9zn_0vqG07WoqOAJaFiointfKNeN_Jt-chF_dqcQOq9Uvv9DpbBjm7S3nULsYSnaWwJTLEJHtVaVqkynVYSynfKfxo3FsqsbXMwpeuMfhduqjOkdvIBwkmHldxbpgkV0kMA2kzS8MBliZIUSebxh4lU-g8irdUwugGkHQuDkVxp68zPL9gx5ZTsd-34zxn9SOpRCahCP2Fcp1-Lz2iC_SIM-lVmmmgiVSSnfCVtPGp_KYMgbXFsr1g4-3uQ-qzD29tnF_42LL5pzqrB1o_j4rtNXV4O3Z92J77r_3hhGDjV7vGxdgZ-exqiB3-ZHOJYQvgiCRVCbGChcFoDw8e1b2fcq-Rw2qdnMWkoLVfB3nbnf6YK62IoT61gWYhNPNSNgEP_CtT0ZbpfVjHZuEfFSNyyf6N1aJqMYQ35ByPrIUQ7NzurcUQuxVj9Gt=w470-h388-no',
        },
      },
    },
    {
      id: '8',
      type: 'TYPE',
      title: 'Style Sheet',
      description: 'A Style sheet',
      string: 'STYLESHEET',
      media: {
        id: 'media7',
        title: 'Image Title',
        type: 'IMAGE',
        blob: {
          small:
            'https://lh3.googleusercontent.com/qRRFv6WVuupkCZTV6_7KfuH63k_EaoVqZqVWba8iOf3lS2Db835fsdDN358thx15Rcq54Yq-T_C6hfzlOqdHjTKHuUMlkg1LAkPcCGkH9dDCiL9iI-GYqJiC4rY0mdIPbfAPkT6IKzwCfElpQnwd5QtDCQcR3dJGALeYreozooCQMgowrTGA-QJdZ94-Hy-1uaztoyys-000FedCcVPFjYjf35-eJDjzmmmwJnsU5cDYyctxuna99uMOQZD5buCz338nK47MguciLpDr_8HtucT1juMAPgaNUPb5azW3sn22B2WtNhgagF0Z2JGOic27XSZTaB41_Toi5RJu_gQz2gf8UA2cYw5Y6RgHIUULVdQutSYLWX72SCaWHFztWvNN5SqmJkeRi6FCcLThx_n3XHyc1lTfgKyzwWX4UJSusp64gWCXcZPAIlqEU18-9qTxdmSDkGbw5SqtOslWzB-HyFBxxJtwzTnU1txIaT2WCFFPVvOgzL1uGOO4iKmd_gFA4dNEkRHQLCISHIHGJVxilzhcOJBSdYYFLkkBmymVWsYnelrhKQOy1nQGoTvT90_9NdjIysTguzQGp7ZRMW4-dr8JkXwpvG9WqCtgktLM=w409-h321-no',
          medium:
            'https://lh3.googleusercontent.com/qRRFv6WVuupkCZTV6_7KfuH63k_EaoVqZqVWba8iOf3lS2Db835fsdDN358thx15Rcq54Yq-T_C6hfzlOqdHjTKHuUMlkg1LAkPcCGkH9dDCiL9iI-GYqJiC4rY0mdIPbfAPkT6IKzwCfElpQnwd5QtDCQcR3dJGALeYreozooCQMgowrTGA-QJdZ94-Hy-1uaztoyys-000FedCcVPFjYjf35-eJDjzmmmwJnsU5cDYyctxuna99uMOQZD5buCz338nK47MguciLpDr_8HtucT1juMAPgaNUPb5azW3sn22B2WtNhgagF0Z2JGOic27XSZTaB41_Toi5RJu_gQz2gf8UA2cYw5Y6RgHIUULVdQutSYLWX72SCaWHFztWvNN5SqmJkeRi6FCcLThx_n3XHyc1lTfgKyzwWX4UJSusp64gWCXcZPAIlqEU18-9qTxdmSDkGbw5SqtOslWzB-HyFBxxJtwzTnU1txIaT2WCFFPVvOgzL1uGOO4iKmd_gFA4dNEkRHQLCISHIHGJVxilzhcOJBSdYYFLkkBmymVWsYnelrhKQOy1nQGoTvT90_9NdjIysTguzQGp7ZRMW4-dr8JkXwpvG9WqCtgktLM=w409-h321-no',
          large:
            'https://lh3.googleusercontent.com/qRRFv6WVuupkCZTV6_7KfuH63k_EaoVqZqVWba8iOf3lS2Db835fsdDN358thx15Rcq54Yq-T_C6hfzlOqdHjTKHuUMlkg1LAkPcCGkH9dDCiL9iI-GYqJiC4rY0mdIPbfAPkT6IKzwCfElpQnwd5QtDCQcR3dJGALeYreozooCQMgowrTGA-QJdZ94-Hy-1uaztoyys-000FedCcVPFjYjf35-eJDjzmmmwJnsU5cDYyctxuna99uMOQZD5buCz338nK47MguciLpDr_8HtucT1juMAPgaNUPb5azW3sn22B2WtNhgagF0Z2JGOic27XSZTaB41_Toi5RJu_gQz2gf8UA2cYw5Y6RgHIUULVdQutSYLWX72SCaWHFztWvNN5SqmJkeRi6FCcLThx_n3XHyc1lTfgKyzwWX4UJSusp64gWCXcZPAIlqEU18-9qTxdmSDkGbw5SqtOslWzB-HyFBxxJtwzTnU1txIaT2WCFFPVvOgzL1uGOO4iKmd_gFA4dNEkRHQLCISHIHGJVxilzhcOJBSdYYFLkkBmymVWsYnelrhKQOy1nQGoTvT90_9NdjIysTguzQGp7ZRMW4-dr8JkXwpvG9WqCtgktLM=w409-h321-no',
          xlarge:
            'https://lh3.googleusercontent.com/qRRFv6WVuupkCZTV6_7KfuH63k_EaoVqZqVWba8iOf3lS2Db835fsdDN358thx15Rcq54Yq-T_C6hfzlOqdHjTKHuUMlkg1LAkPcCGkH9dDCiL9iI-GYqJiC4rY0mdIPbfAPkT6IKzwCfElpQnwd5QtDCQcR3dJGALeYreozooCQMgowrTGA-QJdZ94-Hy-1uaztoyys-000FedCcVPFjYjf35-eJDjzmmmwJnsU5cDYyctxuna99uMOQZD5buCz338nK47MguciLpDr_8HtucT1juMAPgaNUPb5azW3sn22B2WtNhgagF0Z2JGOic27XSZTaB41_Toi5RJu_gQz2gf8UA2cYw5Y6RgHIUULVdQutSYLWX72SCaWHFztWvNN5SqmJkeRi6FCcLThx_n3XHyc1lTfgKyzwWX4UJSusp64gWCXcZPAIlqEU18-9qTxdmSDkGbw5SqtOslWzB-HyFBxxJtwzTnU1txIaT2WCFFPVvOgzL1uGOO4iKmd_gFA4dNEkRHQLCISHIHGJVxilzhcOJBSdYYFLkkBmymVWsYnelrhKQOy1nQGoTvT90_9NdjIysTguzQGp7ZRMW4-dr8JkXwpvG9WqCtgktLM=w409-h321-no',
        },
      },
    },
    {
      id: '999',
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

const headerPlacement = ['Above', 'Below', 'Right', 'Left', 'Custom'];

class Editor extends React.Component {
  static propTypes = {
    handleStateEventChange: PropTypes.func.isRequired,
    handleStateStringChange: PropTypes.func.isRequired,
    handleBooleanToggle: PropTypes.func.isRequired,
    showHeader: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    slugName: PropTypes.string.isRequired,
    headerTop: PropTypes.bool.isRequired,
    deleteCircle: PropTypes.func,
  };

  static defaultProps = {
    deleteCircle: () => {},
  };

  state = {
    // Does not currently toggle due to something in MUI
    headerMenu: false,
    showSelectTypeDialog: this.props.type === '' ? true : false,
    showDeleteDialog: false,
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
    this.props.handleStateStringChange(
      'type',
      this.state.selectedCircle.string,
    );
  };

  humanizeType = type => {
    if (type === '') {
      return 'None Selected';
    }
    return type.includes('_') ? type.split('_').join(' ') : type;
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  handleDeleteCircle = () => {
    this.props.deleteCircle();
    this.setState({ showDeleteDialog: false });
  };

  render() {
    const user = this.props.user;
    const { classes } = this.props;
    const { headerMenu, showSelectTypeDialog, showDeleteDialog } = this.state;
    const humanizedType = this.humanizeType(this.props.type);

    // const createCircleDialogActions = [
    //   {
    //     type: 'BUTTON',
    //     title: 'Create',
    //   },
    //   {
    //     type: 'BUTTON',
    //     title: 'Cancel',
    //   },
    // ];

    // const updateCircleDialogActions = {
    //   styles: {
    //     flexDirection: 'row-reverse',
    //   },
    //   lines: [
    //     {
    //       type: 'BUTTON',
    //       title: 'Update',
    //     },
    //     {
    //       type: 'BUTTON',
    //       title: 'Cancel',
    //     },
    //   ],
    // };

    const typeDialog = (
      <Dialog
        open={showSelectTypeDialog}
        handleCancel={this.keyValueFalse('showSelectTypeDialog')}
        handleSuccess={this.updateParentTypeSelection}
        disablePrimary={this.state.selectedCircle === ''}
        dialogTitle={`${creationTypes.title} ${
          this.state.selectedCircle.title
        }`}
        cancelText={'Cancel'}
        successText={'Select'}
        actions={[{}]}
      >
        <List
          spacing={16}
          listType={'MEDIA_CARD'}
          circles={creationTypes.lines}
          selectedCircle={this.state.selectedCircle}
          handleSingleSelection={this.handleTypeSelection}
        />
      </Dialog>
    );

    const deleteDialog = (
      <Dialog
        open={showDeleteDialog}
        handleCancel={this.keyValueFalse('showDeleteDialog')}
        handleSuccess={this.handleDeleteCircle}
        dialogTitle={'Delete this circle'}
        cancelText={'Cancel'}
        successText={'Delete'}
        successColor={'accent'}
        actions={[{}]}
      >
        <Typography
          style={{ width: 400, height: 200, padding: 42 }}
          type="body1"
        >
          Are you sure you want to delete this?
        </Typography>
      </Dialog>
    );

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
          <FontIcon
            button={true}
            icon={'delete'}
            onClick={this.keyValueTrue('showDeleteDialog')}
          />
        </Bar>

        <form className={classes.fieldsContainer} noValidate>
          <FormControlLabel
            checked={this.props.showHeader}
            control={
              <Switch
                onChange={() => this.props.handleBooleanToggle('showHeader')}
                aria-label="showHeader"
              />
            }
            label="Show Header"
          />
          <FormControlLabel
            checked={this.props.headerTop}
            control={
              <Switch
                onChange={() => this.props.handleBooleanToggle('headerTop')}
                aria-label="headerTop"
              />
            }
            label="Header Above"
          />
          <FormControlLabel
            checked={this.props.public}
            control={
              <Switch
                onChange={() => this.props.handleBooleanToggle('public')}
                aria-label="headerTop"
              />
            }
            label="Public"
          />
          {/* <Button
            color="primary"
            raised
            aria-haspopup="true"
            style={{ marginLeft: 20 }}
            onClick={this.keyValueTrue('showSelectTypeDialog')}
          >
            Header styles
          </Button>
          <Menu
            closeMenu={this.keyValueFalse('headerMenu')}
            menuState={this.state.headerMenu}
            placement="bottom-end"
            style={{ flex: 1 }}
            target={
              <FontIcon
                height={16}
                aria-label="More"
                aria-owns={headerMenu ? 'menu-list' : null}
                icon="arrow_drop_down"
              />
            }
            menuItems={headerPlacement.map(option => (
              <MenuItem key={option} onClick={this.keyValueFalse('headerMenu')}>
                {option}
              </MenuItem>
            ))}
          /> */}
          {/* <FontIcon
                button={true}
                aria-label="More"
                aria-owns={headerMenu ? 'menu-list' : null}
                aria-haspopup="true"
                onClick={this.toggleBoolean('headerMenu')}
                icon="more_horiz"
              /> */}
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
            value={this.props.circle.title}
            onChange={this.props.handleStateEventChange('title')}
          />
          <TextField
            className={classes.textField}
            id="subtitle"
            label="Subtitle"
            margin="normal"
            fullWidth={true}
            value={this.props.circle.subtitle}
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
            value={this.props.circle.description}
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
            value={this.props.circle.tags}
            onChange={this.props.handleStateEventChange('tags')}
          />
          <FormHelperText style={{ marginLeft: 8 }}>
            These will be terms that allow you to find this.
          </FormHelperText>
        </form>
        {typeDialog}
        {deleteDialog}
      </div>
    );
  }
}

export default withStyles(style)(Editor);
