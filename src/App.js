import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import Nav from "./containers/Nav";
import Main from "./containers/Main";
import Sidebar from "./containers/Sidebar";
import Demo from "./components/Demo";
import Adapter from "./Adapter";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { id: 1 },
      doc_id: 1,
      doc: {},
      version: {},
      tool: "pencil",
      color: null,
      size: 3
    };
  }

  handleToolClick = e => {
    console.log(e.currentTarget);
    this.setState({
      tool: e.currentTarget.dataset.tool
    });
  };

  handleSizeChange = e => {
    console.log(e.currentTarget.value);
    this.setState({
      size: e.currentTarget.value
    });
  };

  componentDidMount() {
    // this.loadUser()
    this.loadDoc();
  }

  loadUser() {
    this.setState({
      user: { id: 1 }
    });
  }

  loadDoc(id) {
    Adapter.getDoc(this.state.user.id, this.state.doc_id).then(doc =>
      this.setState({ doc })
    );
  }

  render() {
    return (
      <div>
        <Nav />
        <Grid>
          <Grid.Column width={2}>
            <Sidebar
              handleToolClick={this.handleToolClick}
              handleSizeChange={this.handleSizeChange}
              tool={this.state.tool}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Main
              doc={this.state.doc}
              tool={this.state.tool}
              color={this.state.color}
              size={this.state.size}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
