import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Tools } from "react-sketch";

import Nav from "./containers/Nav";
import Main from "./containers/Main";
import Sidebar from "./containers/Sidebar";
import Footer from "./containers/Footer";
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
    this.userId = 1;

    this.main = React.createRef();
    this.state = {
      user: { id: 1, documents: [] },
      doc_id: 1,
      doc: {},
      versions: [],
      version: {},
      tool: Tools.Pencil,
      color: "black",
      size: 3
    };
  }

  handleToolClick = e => {
    let tool,
      color = this.state.color;

    switch (e.currentTarget.dataset.tool) {
      case "pencil":
        tool = Tools.pencil;
        break;
      case "line":
        tool = Tools.Line;
        break;
      case "rectangle":
        tool = Tools.Rectangle;
        break;
      case "circle":
        tool = Tools.Circle;
        break;
      case "eraser":
        tool = Tools.Pencil;
        color = "white";
        break;
    }

    this.setState({ tool, color });
  };

  handleSizeChange = e => {
    console.log(e.currentTarget.value);
    this.setState({
      size: parseInt(e.currentTarget.value)
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
    this.loadUser();
    this.loadDoc();
  }

  loadUser() {
    Adapter.getUser(this.userId).then(user => this.setState({ user }));
  }

  loadDoc = id => {
    Adapter.getDoc(this.state.user.id, this.state.doc_id).then(doc =>
      this.setState({
        doc,
        version: doc.current_version,
        versions: doc.versions
      })
    );
  };

  loadVersions = id => {
    Adapter.getDocVersions(this.state.user.id, this.state.doc_id).then(
      versions => {
        this.setState({ versions });
      }
    );
  };

  saveVersion() {
    const userId = this.state.user.id;
    const docId = this.state.doc.id;
    const versionData = this.main.current.getDataURL();

    Adapter.saveVersion(userId, docId, versionData).then(version => {
      this.setState({ versions: [...this.state.versions, version] });
    });
  }

  revertToVersion() {
    const userId = this.state.user.id;
    const docId = this.state.doc.id;
    const versionId = this.state.version.id;

    Adapter.revertToVersion(userId, docId, versionId).then(versionsDeleted => {
      this.loadVersions();
    });
  }

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

  handleVersionSelect = version => {
    this.setState({ version });
  };

  handleDeleteSaveClick = () => {
    console.log("Clicked Delete Last Save in Menu");
  };

  handleRevertClick = () => {
    this.revertToVersion();
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
          handleDeleteSaveClick={this.handleDeleteSaveClick}
          handleRevertClick={this.handleRevertClick}
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
                <React.Fragment>
                  <Main
                    ref={this.main}
                    doc={this.state.doc}
                    user={this.state.user}
                    version={this.state.version}
                    tool={this.state.tool}
                    color={this.state.color}
                    size={this.state.size}
                    handleSave={this.saveVersion}
                  />
                  <Footer
                    versions={this.state.versions}
                    handleVersionSelect={this.handleVersionSelect}
                  />
                </React.Fragment>
              )}
            />
            <Route
              path="/users/:id/open"
              render={() => (
                <DocsContainer
                  docs={this.state.user.documents}
                  userId={this.state.user.id}
                />
              )}
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
