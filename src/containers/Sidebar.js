import React, { Component } from "react";
import ToolContainer from "./ToolContainer";
import ColorContainer from "./ColorContainer";

class Sidebar extends Component {
  render() {
    return (
      <div>
        <ToolContainer />
        <ColorContainer />
      </div>
    );
  }
}

export default Sidebar;
