import React, { Component } from "react";
import DocThumb from "../components/DocThumb";
import { Grid, Card, Image, Button } from "semantic-ui-react";

class DocsContainer extends Component {
  render() {
    return (
      ///MAP over Documents of current user?
      <Card.Group>
        <Card className="docCard">
          <Card.Content>
            <Image
              size="tiny"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
            <Card.Header>My Document</Card.Header>
          </Card.Content>
        </Card>
        <Card className="docCard">
          <Card.Content>
            <Image
              size="tiny"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
            <Card.Header>My Document</Card.Header>
          </Card.Content>
        </Card>
        <Card className="docCard">
          <Card.Content>
            <Image
              size="tiny"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
            <Card.Header>My Document</Card.Header>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default DocsContainer;
