import React, { Component } from "react";
import { Grid, Sidebar, Menu, Dropdown, Segment, Icon, Header, Image } from 'semantic-ui-react';

import ThemingLayout from './ThemingLayout';
import Canvas from './Canvas';

class Demo extends Component {
  render() {
    return <div className="container">
        <Menu>
        <Dropdown item text='File'>
          <Dropdown.Menu>
            <Dropdown.Item icon='edit' text='Edit Profile' />
            <Dropdown.Item icon='globe' text='Choose Language' />
            <Dropdown.Item icon='settings' text='Account Settings' />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text='Edit'>
          <Dropdown.Menu>
            <Dropdown.Item icon='edit' text='Edit Profile' />
            <Dropdown.Item icon='globe' text='Choose Language' />
            <Dropdown.Item icon='settings' text='Account Settings' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      <Grid className="">
        <Grid.Column width={2}>
          <div className="sidebar tools">
            <a href="#" className="tool tool-pencil">
              <img src={require('../icons/pencil.png')} alt="pencil" />
            </a>
            <a href="#" className="tool tool-eraser">
              <img src={require('../icons/eraser.png')} alt="eraser" />
            </a>
            <a href="#" className="tool tool-line">
              <img src={require('../icons/line.png')} alt="line" />
            </a>
          </div>
        </Grid.Column>
        <Grid.Column width={10}>
          <ThemingLayout />
        </Grid.Column>
      </Grid>
    </div>
  }
}

export default Demo;
