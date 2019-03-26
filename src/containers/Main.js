import React, { Component } from "react";
import {SketchField, Tools} from 'react-sketch';
import Canvas from "../components/Canvas";

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
}

export default Main;
