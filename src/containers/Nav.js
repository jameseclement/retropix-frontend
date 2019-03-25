import React, { Component } from "react";
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
            <Dropdown.Item icon="pencil alternate" text="New..." />
            <Dropdown.Item icon="folder open outline" text="Open..." />
            <Dropdown.Item icon="save" text="Save..." />
            <Dropdown.Item icon="save outline" text="Save As..." />
            <Dropdown.Item icon="power off" text="Logout..." />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Goodies">
          <Dropdown.Menu>
            <Dropdown.Item icon="music" text="Music" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

export default Nav;
