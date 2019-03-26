import React, { Component } from "react";
import LoginForm from "../components/LoginForm";

import DocsContainer from "./DocsContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Modal extends Component {
  render() {
    return <div>render={() => <DocsContainer user={this.props.user} />}</div>;
  }
}

export default Modal;
