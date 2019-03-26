import React, { Component } from "react";
import {SketchField, Tools} from 'react-sketch';
import Canvas from "../components/Canvas";
// import Modal from "./Modal";

class Main extends Component {
  constructor() {
    super();
    this.sketch = React.createRef();
  }

  render() {
    return (
      <SketchField 
        width='700px' 
        height='400px'
        tool={this.props.tool}
        name="sketch"
        className="canvas-container"
        ref={this.sketch}
        lineColor={this.props.color}
        lineWidth={this.props.size}
        fillColor='black'
        backgroundColor='white'
      />
    );
  }
      // <Canvas
      //   doc={this.props.doc}
      //   tool={this.props.tool}
      //   color={this.props.color}
      //   size={this.props.size}
      //   width={700}
      //   height={400}
      //   handleSave={this.props.handleSave}
      // />
}

export default Main;
