import React, { Component } from "react";

class ToolContainer extends Component {
  render() {
    let pencilClasses = "tool";
    let eraserClasses = "tool";
    let lineClasses = "tool";

    switch (this.props.tool) {
      case "pencil":
        pencilClasses += " active";
        break;
      case "eraser":
        eraserClasses += " active";
        break;
      case "line":
        lineClasses += " active";
        break;
    }

    return (
      <div className="sidebar tools">
        <a
          onClick={this.props.handleToolClick}
          href="#"
          className={pencilClasses}
          data-tool="pencil"
        >
          <img src={require("../icons/pencil.png")} alt="pencil" />
        </a>
        <a
          onClick={this.props.handleToolClick}
          href="#"
          className={eraserClasses}
          data-tool="eraser"
        >
          <img src={require("../icons/eraser.png")} alt="eraser" />
        </a>
        <a
          onClick={this.props.handleToolClick}
          href="#"
          className={lineClasses}
          data-tool="line"
        >
          <img src={require("../icons/line.png")} alt="line" />
        </a>
        <div className="tool">
          <input
            onChange={this.props.handleSizeChange}
            type="range"
            min="3"
            max="30"
          />
        </div>
      </div>
    );
  }
}

export default ToolContainer;
