import React from "react";

const VersionThumbnail = (props) => {
  return (
    <img 
      className="version-thumb"
      src={props.version.data} 
      alt={props.version.id} 
      onClick={() => props.handleVersionSelect(props.version)}
    />
  );
};

export default VersionThumbnail;
