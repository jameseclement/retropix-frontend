import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
class LoginForm extends Component {
  render() {
    return (
      <Form className="myForm">
        <Form.Field>
          <label>Username</label>
          <input placeholder="UserName" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" placeholder="Password" />
        </Form.Field>

        <Button type="submit">Login</Button>
      </Form>
    );
  }
}

export default LoginForm;
