import React, { Component } from "react";
import VersionContainer from "./VersionContainer";

class Footer extends Component {
  render() {
    return (
      <footer>
        <VersionContainer 
          versions={this.props.versions} 
          handleVersionSelect={this.props.handleVersionSelect}
          />
      </footer>
    );
  }
}

export default Footer;
