import React, { Component } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

class SignupForm extends Component {
  render() {
    return (
      <Form className="myForm">
        <Form.Field>
          <label>Create Username</label>
          <input placeholder="UserName" />
        </Form.Field>
        <Form.Field>
          <label>Create Password</label>
          <input type="password" placeholder="Password" />
        </Form.Field>
        <Form.Field>
          <label>Verify Password</label>
          <input type="password" placeholder="Password" />
        </Form.Field>
        <Button type="submit">Create User</Button>
      </Form>
    );
  }
}

export default SignupForm;
