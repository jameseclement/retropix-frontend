import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Modal from '../components/Modal'

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
              onClick={this.props.handleNewClick}
              icon="pencil alternate"
              text="New..."
            />
            <Dropdown.Item as={Link} to="/users/:id/open"
              onClick={this.props.handleOpenClick}
              icon="folder open outline"
              text="Open..." />
            <Dropdown.Item
              onClick={this.props.handleSaveClick}
              icon="save"
              text="Save..."
            />
            <Dropdown.Item
              onClick={this.props.handleSaveAsClick}
              icon="save outline"
              text="Save As..."
            />
            <Dropdown.Item
              onClick={this.props.handleLoginLogoutClick}
              icon="power off"
              text="Logout..."
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
