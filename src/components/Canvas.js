import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import Drawing from "./Drawing";

class Canvas extends Component {
  render() {
    return (
      <Stage width={this.props.width} height={this.props.height}>
        <Layer>
          <Drawing width={this.props.width} height={this.props.height} />
        </Layer>
      </Stage>
    );
  }
}

export default Canvas;
