import React, { Component } from "react";
import DocThumb from "../components/DocThumb";
import { Grid, Card, Image, Button } from "semantic-ui-react";
import Adapter from "../Adapter";

class DocsContainer extends Component {
  constructor(props) {
    super(props);

    const params = props.match.params;
    const userId = params.id;

    this.state = {
      userId,
      docs: []
    };
  }

  componentDidMount() {
    console.log("Docs container mounted");
    this.loadDocs();
  }

  loadDocs() {
    Adapter.getUser(this.state.userId).then(user => {
      const docs = user.documents.filter(
        d => !this.props.deletedDocs.includes(d)
      );
      this.setState({ docs });
    });
  }

  render() {
    return (
      <Card.Group>
        {this.state.docs.map(doc => {
          return <DocThumb doc={doc} userId={this.state.userId} />;
        })}
      </Card.Group>
    );
  }
}

export default DocsContainer;
