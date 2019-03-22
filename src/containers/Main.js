import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import Canvas from "./Canvas";

class Main extends Component {
  render() {
    return (
      <Stage width={300} height={300}>
        <Layer>
          <Canvas />
        </Layer>
      </Stage>
    );
  }
}

export default Main;
