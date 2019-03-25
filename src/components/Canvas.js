import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import Drawing from "./Drawing";
import Adapter from "../Adapter";

class Canvas extends Component {
  constructor() {
    super();
    this.stage = React.createRef();
  }

  handleSave = () => {
    const dataURL = this.stage.current.toDataURL();
    this.props.handleSave(this.props.doc.id, dataURL)
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
              color={this.props.color}
              size={this.props.size}
            />
          </Layer>
        </Stage>
        <button onClick={this.handleSave}>Save</button>
      </React.Fragment>
    );
  }
}

export default Canvas;
