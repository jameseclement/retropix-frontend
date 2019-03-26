import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

class ToolContainer extends Component {
  constructor() {
    super();
    this.colors = [
      "rgb(0,0,0)",
      "rgb(81,81,81)",
      "rgb(203,203,203)",
      "rgb(255,255,255)",
      "rgb(220,52,40)",
      "rgb(240,132,76)",
      "rgb(111,34,245)",
      "rgb(234,58,247)",
      "rgb(54,123,33)",
      "rgb(117,250,76)",
      "rgb(0,24,245)",
      "rgb(114,251,253)",
      "rgb(148,110,42)",
      "rgb(255,254,84)",
      "rgb(97,70,19)",
      "rgb(247,197,153)"
    ];
  }
  render() {
    let pencilClasses = "tool";
    let eraserClasses = "tool";
    let lineClasses = "tool";
    let rectClasses = "tool";
    let circleClasses = "tool";

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
      case "rectangle":
        rectClasses += " active";
        break;
      case "circle":
        circleClasses += " active";
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
        <a
          onClick={this.props.handleToolClick}
          href="#"
          className={rectClasses}
          data-tool="rectangle"
        >
          <img src={require("../icons/rectangle.png")} alt="rectangle" />
        </a>
        <a
          onClick={this.props.handleToolClick}
          href="#"
          className={circleClasses}
          data-tool="circle"
        >
          <img src={require("../icons/circle.png")} alt="circle" />
        </a>
        <div className="tool">
          <label> Brush Thickness </label>
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
                style={{ backgroundColor: color }}
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
