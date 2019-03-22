import React, { Component } from "react";
import { Image } from "react-konva";

class Canvas extends Component {
  constructor() {
    super();
    this.state = {
      isDrawing: false,
      mode: "brush"
    };
  }

  componentDidMount() {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    this.setState({ canvas, ctx });
  }

  handleMouseDown = () => {
    this.setState({
      isDrawing: true
    });
    const stage = this.image.parent.parent;
    this.lastPointerPosition = stage.getPointerPosition();
  };

  handleMouseUp = () => {
    this.setState({
      isDrawing: false
    });
  };

  handleMouseMove = () => {
    const { ctx, isDrawing, mode } = this.state;

    if (!isDrawing) {
      return;
    }

    ctx.strokeStyle = "#000";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;

    if (mode === "brush") {
      ctx.globalCompositeOperation = "source-over";
    } else if (mode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    }
    ctx.beginPath();

    let localPos = {
      x: this.lastPointerPosition.x - this.image.x(),
      y: this.lastPointerPosition.y - this.image.y()
    };
    ctx.moveTo(localPos.x, localPos.y);

    const stage = this.image.parent.parent;

    var pos = stage.getPointerPosition();
    localPos = {
      x: pos.x - this.image.x(),
      y: pos.y - this.image.y()
    };

    ctx.lineTo(localPos.x, localPos.y);
    ctx.closePath();
    ctx.stroke();
    this.lastPointerPosition = pos;
    this.image.getLayer().draw();
  };

  render() {
    const { canvas } = this.state;
    return (
      <Image
        image={canvas}
        ref={node => (this.image = node)}
        width={300}
        height={300}
        stroke="blue"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}

export default Canvas;
