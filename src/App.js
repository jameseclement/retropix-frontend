import React, { Component } from "react";
import { Tools } from "react-sketch";

import Nav from "./containers/Nav";
import Adapter from "./Adapter";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import DocsContainer from "./containers/DocsContainer";
import Document from "./containers/Document";
import { map } from "lodash";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import music from './audio/surf.wav';
import Sound from 'react-sound';

class App extends Component {
  constructor() {
    super();

    this.userId = 1;
    this.main = React.createRef();

    this.state = {
      user: { id: 1, documents: [] },
      doc_id: 1,
      deletedDocs: [],
      users: [],
      musicStatus: Sound.status.STOPPED
    };
  }

  componentDidMount() {
    this.loadUsers();
    // this.loadUser();
  }

  handleUserSelect = e => {
    const id = e.target.value;
    window.location.href = `http://localhost:3001/users/${id}`;
  };

  loadUsers() {
    return Adapter.getUsers().then(users => {
      // const users = userList.map(user => {
      //   return {
      //     key: user.id,
      //     text: user.username,
      //     value: user.id
      //   };
      // });
      this.setState({ users });
    });
  }

  // loadUser() {
  //   Adapter.getUser(this.userId).then(user => this.setState({ user }));
  // }

  newDoc = () => {
    Adapter.newDoc(this.userId).then(doc => {
      // this.props.history.push(`/users/${this.user.id}/documents/${doc.id}`);
    });
  };

  handleNewClick = () => {
    this.newDoc();
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
    let status = this.state.musicStatus === Sound.status.PLAYING ? 
      Sound.status.STOPPED : Sound.status.PLAYING;
    this.setState({musicStatus: status});
  };

  handleVersionSelect = version => {
    this.setState({ version });
  };

  handleDelete = deletedDoc => {
    this.setState({ deletedDocs: [...this.state.deletedDocs, deletedDoc] });
  };

  handleRevertClick = () => {
    this.revertToVersion();
  };

  render() {
    return (
      <Router>
        <Route
          path="/users/:id"
          render={props => (
            <Nav
              {...props}
              handleNewClick={this.handleNewClick}
              handleOpenClick={this.handleOpenClick}
              handleLoginLogoutClick={this.handleLoginLogoutClick}
              handleMusicClick={this.handleMusicClick}
            />
          )}
        />
        <Route
          exact
          path="/users/:user_id/documents/:id"
          render={props => <Document {...props} />}
        />
        <Route
          exact
          path="/users/:id"
          render={props => (
            <DocsContainer {...props} deletedDocs={this.state.deletedDocs} />
          )}
        />
        <Route
          exact
          path="/users/:id/documents"
          render={props => (
            <DocsContainer {...props} deletedDocs={this.state.deletedDocs} />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <LoginForm
              {...props}
              users={this.state.users}
              handleUserSelect={this.handleUserSelect}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={props => (
            <LoginForm
              {...props}
              users={this.state.users}
              handleUserSelect={this.handleUserSelect}
            />
          )}
        />
        <Route path="/signup" component={SignupForm} />

        <Sound
          url={music}
          playStatus={this.state.musicStatus}
        />
      </Router>
    );
  }
}

export default App;
