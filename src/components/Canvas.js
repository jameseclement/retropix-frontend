import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import Drawing from "./Drawing";

class Canvas extends Component {
  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <Drawing />
        </Layer>
      </Stage>
    );
  }
}

export default Canvas;
