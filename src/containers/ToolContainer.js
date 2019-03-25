import React, { Component } from "react";

class ToolContainer extends Component {
  render() {
    return (
      <div className="sidebar tools">
        <a
          onClick={this.props.handleToolClick}
          href="#"
          className="tool tool-pencil"
          data-tool="pencil"
        >
          <img src={require("../icons/pencil.png")} alt="pencil" />
        </a>
        <a
          onClick={this.props.handleToolClick}
          href="#"
          className="tool tool-eraser"
          data-tool="eraser"
        >
          <img src={require("../icons/eraser.png")} alt="eraser" />
        </a>
        <a
          onClick={this.props.handleToolClick}
          href="#"
          className="tool tool-line"
          data-tool="line"
        >
          <img src={require("../icons/line.png")} alt="line" />
        </a>
      </div>
    );
  }
}

export default ToolContainer;
