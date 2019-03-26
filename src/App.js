import React, { Component } from "react";
import { Tools } from "react-sketch";

import Nav from "./containers/Nav";
import Adapter from "./Adapter";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import DocsContainer from "./containers/DocsContainer";
import Document from "./containers/Document";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    
    this.userId = 1;
    this.main = React.createRef();

    this.state = {
      user: { id: 1, documents: [] },
      doc_id: 1,
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    Adapter.getUser(this.userId)
      .then(user => this.setState({ user }));
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
        <Route path="/users/:id"
          render={props => 
            <Nav {...props}
              handleNewClick={this.handleNewClick}
              handleOpenClick={this.handleOpenClick}
              handleSaveClick={this.handleSaveClick}
              handleSaveAsClick={this.handleSaveAsClick}
              handleLoginLogoutClick={this.handleLoginLogoutClick}
              handleMusicClick={this.handleMusicClick}
              handleDeleteSaveClick={this.handleDeleteSaveClick}
              handleRevertClick={this.handleRevertClick} />
          }
        />
        <Route
          exact path="/users/:id/documents/:id"
          render={props => <Document {...props} user={this.state.user} />}/>
        <Route
          exact path="/users/:id"
          render={props => <DocsContainer {...props} user={this.state.user} />} />
        <Route
          exact path="/users/:id/documents"
          render={props => <DocsContainer {...props} user={this.state.user} />} />
        <Route 
          path="/login" 
          component={LoginForm} />
        <Route 
          path="/signup"
          component={SignupForm} />
      </Router>
    );
  }
}

export default App;
