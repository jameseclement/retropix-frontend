import React, { Component } from "react";
import { SketchField, Tools } from "react-sketch";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Adapter from "../Adapter";

// import Main from "./components/Main";
import Sidebar from "./Sidebar";
import VersionContainer from "./VersionContainer";

class Document extends Component {
  constructor(props) {
    super(props);
    const docId = props.match.params.id;

    this.state = {
      docId,
      doc: {},
      versions: [],
      version: {},
      color: "black",
      size: 3,
      tool: Tools.Pencil
    };

    this.sketch = React.createRef();
  }

  componentDidMount() {
    this.loadDoc(this.state.docId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.version !== this.state.version) {
      this.loadVersion();
    }
  }

  loadDoc() {
    Adapter.getDoc(this.props.user.id, this.state.docId).then(doc =>
      this.setState({
        doc,
        version: doc.current_version,
        versions: doc.versions
      })
    );
  }

  deleteDoc = () => {
    Adapter.deleteDoc(this.props.user.id, this.state.docId);
    this.props.handleDelete(this.state.docs);
  };

  loadVersions() {
    Adapter.getDocVersions(this.props.user.id, this.state.docId).then(
      versions => {
        this.setState({ versions });
      }
    );
  }

  saveVersion() {
    const userId = this.props.user.id;
    const docId = this.state.docId;
    const versionData = this.getDataURL();

    Adapter.saveVersion(userId, docId, versionData).then(version => {
      this.setState({ versions: [...this.state.versions, version] });
    });
  }

  revertToVersion() {
    const userId = this.props.user.id;
    const docId = this.state.docId;
    const versionId = this.state.version.id;

    Adapter.revertToVersion(userId, docId, versionId).then(versionsDeleted => {
      this.loadVersions();
    });
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
    console.log(e.currentTarget.dataset.tool);
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
    this.setState({ version });
  };

  handleSaveClick = () => {
    this.saveVersion();
  };

  handleUndoClick = () => {
    this.sketch.current.undo();
  };

  handleRedoClick = () => {
    this.sketch.current.redo();
  };

  handleRevertClick = () => {
    this.revertToVersion();
  };

  handleDeleteClick = () => {
    this.deleteDoc();
  };

  handleUpdateTitle = (event) => {
    const title = event.target.value;
    Adapter.updateDocTitle(this.props.user.id, this.state.doc, title);
  }

  render() {
    return (
      <Grid className="grid-container">
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
        <Grid.Column width={8} className="canvas-container">
          <div className="main">
            <div className="ui input">
              <input className="title-field"
                type="text" name="title" 
                placeholder="Untitled" 
                defaultValue={this.state.doc.title} 
                onBlur={this.handleUpdateTitle} />
            </div>
            <SketchField
              width="700px"
              height="400px"
              tool={this.state.tool}
              name="sketch"
              className="canvas-container"
              ref={this.sketch}
              lineColor={this.state.color}
              lineWidth={this.state.size}
              fillColor="black"
              backgroundColor="white"
            />
            <VersionContainer
              versions={this.state.versions}
              handleVersionSelect={this.handleVersionSelect}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={2}>
          <div className="sidebar tools">
            <a
              href="#"
              className="tool"
              data-tool="save"
              onClick={this.handleSaveClick}
            >
              Save
            </a>
            <a
              href="#"
              className="tool"
              data-tool="undo"
              onClick={this.handleUndoClick}
            >
              Undo
            </a>
            <a
              href="#"
              className="tool"
              data-tool="redo"
              onClick={this.handleRedoClick}
            >
              Redo
            </a>
            <a
              href="#"
              className="tool"
              data-tool="revert"
              onClick={this.handleRevertClick}
            >
              Revert
            </a>
            <Link
              to={`/users/${this.props.user.id}/documents`}
              className="tool"
              data-tool="delete"
              onClick={this.handleDeleteClick}
            >
              Delete
            </Link>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Document;
