import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from "./Modal";

import {
  Grid,
  Sidebar,
  Menu,
  Dropdown,
  Segment,
  Icon,
  Header,
  Image
} from "semantic-ui-react";

class Nav extends Component {
  render() {
    return (
      <Menu>
        <Dropdown item text="File" className="file">
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/users/:id/documents/:id"
              onClick={this.props.handleNewClick}
              icon="pencil alternate"
              text="New..."
            />
            <Dropdown.Item
              as={Link}
              to="/users/:id/open"
              onClick={this.props.handleOpenClick}
              icon="folder open outline"
              text="Open..."
            />
            <Dropdown.Item
              onClick={this.props.handleSaveClick}
              icon="save"
              text="Save..."
            />

            <Dropdown.Item
              onClick={this.props.handleDeleteSaveClick}
              icon="delete"
              text="Delete Last Save"
            />

            <Dropdown.Item
              onClick={this.props.handleRevertClick}
              icon="undo"
              text="Revert to Selected Version"
            />
            <Dropdown.Item
              as={Link}
              to="/login"
              onClick={this.props.handleLoginLogoutClick}
              icon="power off"
              text="Login..."
            />
            <Dropdown.Item
              as={Link}
              to="/signup"
              onClick={this.props.handleSignupClick}
              icon="heart"
              text="Signup"
            />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Goodies">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={this.props.handleMusicClick}
              icon="music"
              text="Music"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

export default Nav;
