import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DocThumb = props => {
  const { title, current_version } = props.doc;
  return (
    <Card
      className="docCard"
      as={Link}
      to={`/users/${props.userId}/documents/${props.doc.id}`}
    >
      <Card.Content>
        <Image size="medium" src={current_version.data} />
        <Card.Header>{title}</Card.Header>
      </Card.Content>
    </Card>
  );
};

export default DocThumb;
