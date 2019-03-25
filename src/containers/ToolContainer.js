import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

class ToolContainer extends Component {
  constructor() {
    super();
    this.colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "blue",
      "violet",
      "purple",
      "pink",
      "brown",
      "grey",
      "black"
    ];
  }
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
            value={this.props.size}
          />
        </div>
        <div className="tool" style={{ backgroundColor: this.props.color }}>
          <Grid columns={6} padded>
            <Grid.Column />
            <Grid.Column />
            <Grid.Column />
          </Grid>
        </div>
        <div className="tool">
          <Grid columns={4} padded>
            {this.colors.map(color => (
              <Grid.Column
                onClick={this.props.handleColorChange}
                color={color}
                key={color}
              />
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default ToolContainer;
