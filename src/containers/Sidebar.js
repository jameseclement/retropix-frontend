import React, { Component } from "react";
import ToolContainer from "./ToolContainer";
import ColorContainer from "./ColorContainer";

class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <ToolContainer
          handleToolClick={this.props.handleToolClick}
          handleSizeChange={this.props.handleSizeChange}
          tool={this.props.tool}
        />
        <ColorContainer />
      </React.Fragment>
    );
  }
}

export default Sidebar;
