import React, { Component } from "react";
import Konva from "react-konva";
import { isEmpty } from "lodash";

class Drawing extends Component {
  constructor(props) {
    super(props);

    this.imageLoaded = false;

    this.state = {
      isDrawing: false,
      startedLine: false
    };
  }

  componentDidMount() {
    const canvas = document.createElement("canvas");
    canvas.width = this.props.width;
    canvas.height = this.props.height;
    const ctx = canvas.getContext("2d");

    this.setState({ canvas, ctx });
  }

  componentDidUpdate(prevProps) {
    // console.log('didUpdate', prevProps, this.props)
    if (this.props.doc !== prevProps.doc) {
      // this.renderImage()
      this.handleMouseMove();
    }
  }

  renderImage() {
    const { ctx } = this.state;
    const { doc } = this.props;
    const img = new Image();
    // console.log("renderImage", doc);

    img.onload = () => {
      ctx.clearRect(0, 0, this.props.width, this.props.height);
      ctx.drawImage(img, 0, 0);
    };

    img.src = doc.current_version.data;
  }

  handleMouseDown = () => {
    const stage = this.image.parent.parent;
    this.lastPointerPosition = stage.getPointerPosition();

    if (this.props.tool === "line") {
      this.setState({startedLine: !this.state.startedLine});
      if (this.state.startedLine) {
        this.startPoint = stage.getPointerPosition();
      } else {
        this.endPoint = stage.getPointerPosition();
      }
    } else {
      this.setState({isDrawing: true});
    }
  };

  handleMouseUp = () => {
    this.setState({isDrawing: false});

    if (this.props.tool === "line") {
      const {ctx} = this.state;

      ctx.strokeStyle = this.props.color;
      ctx.lineJoin = "round";
      ctx.lineWidth = this.props.size;

      ctx.globalCompositeOperation = "source-over";
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
    }
  };

  handleMouseMove = () => {
    const { ctx, isDrawing, mode } = this.state;
    const { doc } = this.props;

    // load the image
    if (!isEmpty(doc) && !this.imageLoaded) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, this.props.width, this.props.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = doc.current_version.data;
      this.imageLoaded = true;
    }

    if (!isDrawing) {
      return;
    }

    ctx.strokeStyle = this.props.color;
    ctx.lineJoin = "round";
    ctx.lineWidth = this.props.size;

    if (this.props.tool === "pencil") {
      ctx.globalCompositeOperation = "source-over";
    } else if (this.props.tool === "eraser") {
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
    let { canvas, ctx } = this.state;
    // console.log(this.state);

    // if (!isEmpty(doc)) {
    //   console.log("not empty doc", doc);
    //   src = doc.current_version.data;
    // }

    // if (ctx) {
    //   // console.log("not empty context", ctx);
    //   const {doc} = this.props;

    //   if (!isEmpty(doc)) {
    //     console.log("not empty doc", doc);
    //     canvas = new Image();
    //     canvas.onload = () => {
    //       ctx.clearRect(0, 0, this.props.width, this.props.height)
    //       ctx.drawImage(canvas, 0, 0)
    //     }
    //     canvas.src = doc.current_version.data
    //     // console.log(this.props);
    //   }
    // }

    return (
      <Konva.Image
        image={canvas}
        ref={node => (this.image = node)}
        width={this.props.width}
        height={this.props.height}
        stroke="blue"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}

export default Drawing;
