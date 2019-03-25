import React, { Component } from "react";
import Tool from "../components/Tool";

class ToolContainer extends Component {
  render() {
    return (
      <div className="sidebar tools">
        <a href="#" className="tool tool-pencil">
          <img src={require('../icons/pencil.png')} alt="pencil" />
        </a>
        <a href="#" className="tool tool-eraser">
          <img src={require('../icons/eraser.png')} alt="eraser" />
        </a>
        <a href="#" className="tool tool-line">
          <img src={require('../icons/line.png')} alt="line" />
        </a>
      </div>
    );
  }
}

export default ToolContainer;
