import React from "react";

const VersionThumbnail = (props) => {
  return (
    <li className="version-thumb">
      <img 
        src={props.version.data} 
        alt={props.version.id} 
        onClick={() => props.handleVersionSelect(props.version)}
      />
    </li>
  );
};

export default VersionThumbnail;
