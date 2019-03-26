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
    const params = this.props.match.params;

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
              to={`/users/${params.id}/documents`}
              onClick={this.props.handleOpenClick}
              icon="folder open outline"
              text="Open..."
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
