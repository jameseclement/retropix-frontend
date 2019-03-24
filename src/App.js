import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Nav from "./containers/Nav";
import Main from "./containers/Main";
import Adapter from "./Adapter";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { id: 1 },
      doc_id: 1,
      doc: {},
      version: {},
      tool: null,
      color: null,
      size: null
    };
  }

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
        <Main doc={this.state.doc} />
      </div>
    )
  }
}

export default App;
