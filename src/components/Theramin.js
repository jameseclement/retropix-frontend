import React, { Component } from 'react'

export default class Theramin extends Component {
  constructor(props) {
    super(props);

    this.context = null;
    this.oscillator = null;

    this.state = {
      volume: 0,
      frequency: 0,
      pitch: 0
    }
  }
  
  componentDidMount() {
    this.context = new AudioContext();
    this.oscillator = this.context.createOscillator();
    this.oscillator.connect(this.context.destination);
    this.oscillator.start(this.context.currentTime);
  }

  componentWillUnmount() {
    this.oscillator.stop(this.context.currentTime);
    this.oscillator.disconnect();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.active && (prevProps.x !== this.props.x || prevProps.y !== this.props.y)) {
      this.setState({
        volume: ~~(this.props.x / this.props.width*100) / 100,
        frequency: ~~(1000 * (1-(this.props.y / this.props.height)))
      });
    } else if (!this.props.active) {
      this.setState({volume: 0})
    }
  }

  // handleMouseDown = (x, y) => {
  //   this.setState({
  //     active: true,
  //     volume: ~~(x / window.innerWidth*100) / 100,
  //     frequency: ~~(1000 * (1-(y / window.innerHeight)))
  //   });
  // }

  // handleMouseUp = event => {
  //   this.setState({
  //     active: false,
  //     volume: 0
  //   });
  // }

  // handleMouseMove = (x, y) => {
  //   if (this.state.active) {
  //     this.setState({
  //       volume: ~~(x / window.innerWidth*100) / 100,
  //       freq: ~~(1000*(1-(y / window.innerHeight)))
  //     });
  //   }
  // }

  setFrequency(freq) {
    if (this.oscillator && this.oscillator.frequency) {
      this.oscillator.frequency.value = freq;
    }
  }

  setVolume(vol) {
    if (this.oscillator && this.oscillator.gain) {
      console.log(this.oscillator)
      this.oscillator.gain.value = vol;
    }
  }

  render() {
    this.setFrequency(this.state.frequency);
    this.setVolume(this.state.volume);
    return <React.Fragment></React.Fragment>
  }
}
