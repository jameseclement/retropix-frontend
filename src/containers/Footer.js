import React, { Component } from "react";
import VersionContainer from "./VersionContainer";

class Footer extends Component {
  render() {
    return (
      <footer>
        <VersionContainer versions={this.props.versions} />
      </footer>
    );
  }
}

export default Footer;
