import React, { Component } from "react";
import DocThumb from "../components/DocThumb";
import { Grid, Card, Image, Button } from "semantic-ui-react";

class DocsContainer extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Card.Group>
        {this.props.docs.map(doc => {
          return <DocThumb doc={doc} userId={this.props.userId} />;
        })}
      </Card.Group>
    );
  }
}

export default DocsContainer;
