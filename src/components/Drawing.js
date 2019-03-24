import React, { Component } from "react";
import Konva from "react-konva";
import {isEmpty} from 'lodash';

import Theramin from './Theramin'

class Drawing extends Component {
  constructor(props) {
    super(props);
    this.theramin = React.createRef()

    this.imageLoaded = false;

    this.state = {
      isDrawing: false,
      mode: "brush",
      x: 0, y: 0
    };
  }

  componentDidMount() {
    this.loadAudio();

    const canvas = document.createElement("canvas");
    canvas.width = this.props.width;
    canvas.height = this.props.height;
    const ctx = canvas.getContext("2d");

    this.setState({ canvas, ctx });
  }

  componentWillUnmount() {
    this.unloadAudio();
  }

  componentDidUpdate(prevProps) {
    // console.log('didUpdate', prevProps, this.props)
    if (this.props.doc !== prevProps.doc) {
      // this.renderImage()
      this.handleMouseMove()
    }
  }

  loadAudio() {
    this.context = new AudioContext();
    this.oscillator = this.context.createOscillator();
    this.oscillator.connect(this.context.destination);
    this.oscillator.start(this.context.currentTime);
  }

  unloadAudio() {
    this.oscillator.stop(this.context.currentTime);
    this.oscillator.disconnect();
  }

  setFrequency(val) {
    if (!this.oscillator || !this.oscillator.frequency) return
    const freq = ~~(1000 * (1-(val / this.props.height)));
    this.oscillator.frequency.value = freq;
  }

  setVolume(val) {
    if (!this.oscillator || !this.oscillator.gain) return
    console.log('isDrawing', this.state.isDrawing)

    if (this.state.isDrawing) {
      const vol = ~~(val / this.props.width*100) / 100;
      this.oscillator.gain.value = vol;
    } else {
      this.oscillator.gain.value = 0
    }
  }

  renderImage() {
    const {ctx} = this.state;
    const {doc} = this.props;
    const img = new Image();
    console.log('renderImage', doc)

    img.onload = () => {
      ctx.clearRect(0, 0, this.props.width, this.props.height)
      ctx.drawImage(img, 0, 0)
    }
    
    img.src = doc.current_version.data
  }

  handleMouseDown = (event) => {
    const stage = this.image.parent.parent;
    this.lastPointerPosition = stage.getPointerPosition();
    
    this.setState({
      isDrawing: true,
      x: this.lastPointerPosition.x,
      y: this.lastPointerPosition.y
    });

    // const xPos = event.clientX || event.touches[0].clientX;
    // const yPos = event.clientY || event.touches[0].clientY;
    // this.theramin.current.handleMouseDown(xPos, yPos);
    this.setFrequency(this.lastPointerPosition.x)
    this.setVolume(this.lastPointerPosition.y)
  };

  handleMouseUp = (event) => {
    this.setState(
      {isDrawing: false},
      () => this.setVolume(0)
    );
  };

  handleMouseMove = (event) => {
    const { ctx, isDrawing, mode } = this.state;
    const {doc} = this.props;
    
    // load the image
    if (!isEmpty(doc) && !this.imageLoaded) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, this.props.width, this.props.height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = doc.current_version.data
      this.imageLoaded = true;
    }

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

    this.setState({x: localPos.x, y: localPos.y})

    this.setFrequency(localPos.x)
    this.setVolume(localPos.y)
  };

  render() {
    let {canvas, ctx} = this.state;
    // console.log(this.state)

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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default Drawing;
