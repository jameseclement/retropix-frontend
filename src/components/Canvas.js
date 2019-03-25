import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import Drawing from "./Drawing";
import Adapter from "../Adapter";

class Canvas extends Component {
  constructor() {
    super();
    this.stage = React.createRef();
  }

  onSave = () => {
    const dataURL = this.stage.current.toDataURL();
    // Adapter.saveDocument( , id, versionData)
    // console.log(this.stage.current.toDataURL());
  };

  render() {
    return (
      <React.Fragment>
        <Stage
          ref={this.stage}
          width={this.props.width}
          height={this.props.height}
        >
          <Layer>
            <Drawing
              doc={this.props.doc}
              tool={this.props.tool}
              width={this.props.width}
              height={this.props.height}
            />
          </Layer>
        </Stage>
        <button onClick={this.onSave}>Save</button>
      </React.Fragment>
    );
  }
}

export default Canvas;
