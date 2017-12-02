import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FormHelperText from 'material-ui/Form/FormHelperText';
import Button from 'material-ui/Button';
import PopUpModule from '../../reactComponents/PopUpModule';
import Card from 'material-ui/Card';

class Header extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    slugName: PropTypes.string.isRequired,
  };

  headerOptions = () => {
    const headerOptions = [
      {
        title: 'title',
        description: 'A small line of text to summarize this piece of data',
        img: '',
        blob: {
          added: this.props.addTitle,
          show: this.props.showTitle,
        },
      },
    ];

    return headerOptions;
  };

  state = {
    anchorEl: null,
    headerMenuOpen: false,
  };

  handleClick = event => {
    this.setState({ headerMenuOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ headerMenuOpen: false });
  };

  render() {
    const user = this.props.user;
    return (
      <Card>
        <Button
          raised
          color="primary"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Add Field
        </Button>

        {this.props.addTitle ? (
          <div>
            <TextField
              required
              id="type"
              label="Type"
              margin="normal"
              onChange={this.props.handleChange('type')}
            />
            <br />
          </div>
        ) : null}
        <TextField
          required
          id="slugName"
          label="URL"
          margin="normal"
          value={this.props.slugName}
          onChange={this.props.handleSlugChange}
        />
        <FormHelperText>
          A way to for you to easily find this
          <br />
          www.MyiWorlds.com/{user.username}/{this.props.slugName}
        </FormHelperText>
        <br />
        <TextField
          required
          id="title"
          label="Title"
          margin="normal"
          onChange={this.props.handleChange('title')}
        />
        <br />
        <TextField
          required
          id="subtitle"
          label="Subtitle"
          margin="normal"
          onChange={this.props.handleChange('subtitle')}
        />
        <br />
        <TextField
          required
          id="description"
          label="Description"
          type="description"
          margin="normal"
          onChange={this.props.handleChange('description')}
        />

        {this.state.headerMenuOpen ? (
          <PopUpModule
            open={this.state.headerMenuOpen}
            close={this.handleDialogClose}
            handleBooleanToggle={this.props.handleBooleanToggle}
            contentShowing={this.props.contentShowing}
            dialogTitle="Test"
          >
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />
            Helo
            <br />Helo
            <br />
            Helo
            <br />
            Helo
            <br />
          </PopUpModule>
        ) : null}
      </Card>
    );
  }
}

export default Header;
