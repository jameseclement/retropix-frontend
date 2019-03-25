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
          handleColorChange={this.props.handleColorChange}
          tool={this.props.tool}
          size={this.props.size}
          color={this.props.color}
        />
        <ColorContainer />
      </React.Fragment>
    );
  }
}

export default Sidebar;
