import React, { Component } from "react";
import VersionThumbnail from "../components/VersionThumbnail";

class VersionContainer extends Component {
  render() {
    return (
      <ul className="version-list">{this.props.versions.map(version => {
        return <li><VersionThumbnail key={version.id} version={version} /></li>
      })}</ul>
    );
  }
}

export default VersionContainer;
