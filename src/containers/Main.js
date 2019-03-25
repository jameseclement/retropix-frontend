import React, { Component } from "react";
import Canvas from "../components/Canvas";
// import Modal from "./Modal";

class Main extends Component {
  render() {
    return (
      <Canvas
        doc={this.props.doc}
        tool={this.props.tool}
        color={this.props.color}
        size={this.props.size}
        width={700}
        height={400}
      />
    );
  }
}

export default Main;
