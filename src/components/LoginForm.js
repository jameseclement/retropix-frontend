import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  render() {
    return (
      <select
        placeholder="Select Your User ID"
        onChange={this.props.handleUserSelect}
      >
        {this.props.users.map(u => {
          return (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          );
        })}
      </select>
    );
  }
}

export default LoginForm;
