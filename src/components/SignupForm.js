import React, { Component } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

class SignupForm extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder="UserName" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" placeholder="Password" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default SignupForm;
