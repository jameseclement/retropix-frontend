import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import Nav from "./containers/Nav";
import Main from "./containers/Main";
import Sidebar from "./containers/Sidebar";
import Demo from "./components/Demo";
import Modal from "./containers/Modal";
import Adapter from "./Adapter";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import DocsContainer from "./containers/DocsContainer";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { id: 1 },
      doc_id: 1,
      doc: {},
      version: {},
      tool: "pencil",
      color: "black",
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

  handleColorChange = e => {
    e.persist();
    console.log(e.target.style.backgroundColor);
    this.setState({
      color: e.target.style.backgroundColor
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

  loadDoc = id => {
    Adapter.getDoc(this.state.user.id, this.state.doc_id).then(doc =>
      this.setState({ doc })
    );
  };

  saveVersion = (docId, versionData) => {
    const userId = this.state.user.id;
    Adapter.saveVersion(userId, docId, versionData);
  };

  handleNewClick = () => {
    console.log("Clicked New in Menu");
  };

  handleOpenClick = () => {
    console.log("Clicked Open in Menu");
  };

  handleSaveClick = () => {
    this.saveVersion();
  };

  handleSaveAsClick = () => {
    console.log("Clicked Save As in Menu");
  };

  handleLoginLogoutClick = () => {
    console.log("Clicked Login/Logout in Menu");
  };

  handleMusicClick = () => {
    console.log("Clicked Music in Menu");
  };

  render() {
    return (
      <Router>
        <Nav
          handleNewClick={this.handleNewClick}
          handleOpenClick={this.handleOpenClick}
          handleSaveClick={this.handleSaveClick}
          handleSaveAsClick={this.handleSaveAsClick}
          handleLoginLogoutClick={this.handleLoginLogoutClick}
          handleMusicClick={this.handleMusicClick}
        />
        <Grid>
          <Grid.Column width={2}>
            <Sidebar
              handleToolClick={this.handleToolClick}
              handleSizeChange={this.handleSizeChange}
              tool={this.state.tool}
              handleColorChange={this.handleColorChange}
              size={this.state.size}
              color={this.state.color}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Route
              path="/users/:id/documents/:id"
              render={() => (
                <Main
                  doc={this.state.doc}
                  tool={this.state.tool}
                  color={this.state.color}
                  size={this.state.size}
                  handleSave={this.saveVersion}
                />
              )}
            />
            <Route
              path="/users/:id/open"
              render={() => <DocsContainer user={this.state.user} />}
            />

            <Route path="/login" render={() => <LoginForm />} />
            <Route path="/signup" render={() => <SignupForm />} />
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

export default App;
