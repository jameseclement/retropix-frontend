import React, { Component } from "react";
import {SketchField, Tools} from 'react-sketch';
import { Grid } from "semantic-ui-react";

import Adapter from "../Adapter";

// import Main from "./components/Main";
import Sidebar from "./Sidebar";
import VersionContainer from "./VersionContainer";

class Document extends Component {
  constructor(props) {
    super(props);
    const id = props.match.params.id;

    this.state = {
      id,
      doc: {},
      versions: [],
      version: {},
      color: 'black',
      size: 3,
      tool: Tools.Pencil
    }

    this.sketch = React.createRef();
  }

  componentDidMount() {
    this.loadDoc(this.state.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.version !== this.state.version) {
      this.loadVersion();
    }
  }

  loadDoc() {
    Adapter.getDoc(this.props.user.id, this.state.id).then(doc =>
      this.setState({doc, 
        version: doc.current_version, 
        versions: doc.versions})
    );
  };

  loadVersions() {
    Adapter.getDocVersions(this.props.user.id, this.state.id)
      .then(versions => {
        this.setState({versions})
      })
  }

  saveVersion() {
    const userId = this.props.user.id;
    const docId = this.state.id;
    const versionData = this.getDataURL();

    Adapter.saveVersion(userId, docId, versionData)
      .then(version => {
        this.setState({versions: [...this.state.versions, version]})
      })
  };

  revertToVersion() {
    const userId = this.props.user.id;
    const docId = this.state.id;
    const versionId = this.state.version.id;
    
    Adapter.revertToVersion(userId, docId, versionId)
      .then((versionsDeleted) => {
        this.loadVersions()
      })
  }

  loadVersion() {
    const sketch = this.sketch.current;
    sketch.clear();
    sketch.setBackgroundFromDataUrl(this.state.version.data);
  }

  getDataURL() {
    return this.sketch.current.toDataURL();
  }

  handleToolClick = e => {
    let tool;
    let color = this.state.color;

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

  handleVersionSelect = version => {
    this.setState({version})
  };

  render() {
    return (
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
          <div className="main">
            <SketchField 
              width='700px' 
              height='400px'
              tool={this.props.tool}
              name="sketch"
              className="canvas-container"
              ref={this.sketch}
              lineColor={this.state.color}
              lineWidth={this.state.size}
              fillColor='black'
              backgroundColor='white'
            />
            <VersionContainer 
              versions={[]}
              handleVersionSelect={this.props.handleVersionSelect}
            />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Document;