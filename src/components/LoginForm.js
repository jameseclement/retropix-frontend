import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  render() {
    return (
      <div className="login-page"><div className="login-container">
        <img className="login-logo" src={require('../logo.png')} alt="logo" />
        <form className="login-form">
          <select
            placeholder="Select Your User ID"
            onChange={this.props.handleUserSelect} >
            {this.props.users.map(u => {
              return (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              );
            })}
          </select>
        </form>
      </div></div>
    );
  }
}

export default LoginForm;
