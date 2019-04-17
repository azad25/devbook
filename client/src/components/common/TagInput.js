import React, { Component } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class TagInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [
        { id: "HTML", text: "HTML" },
        { id: "CSS", text: "CSS" },
        { id: "JAVASCRIPT", text: "JAVASCRIPT" },
        { id: "PHP", text: "PHP" },
        { id: "SQL", text: "SQL" },
        { id: "MYSQL", text: "MYSQL" },
        { id: "PYTHON", text: "PYTHON" },
        { id: "JAVA", text: "JAVA" },
        { id: "C#", text: "C#" },
        { id: "R", text: "R" },
        { id: "GO", text: "GO" },
        { id: "F#", text: "F#" },
        { id: "ASP.NET", text: "ASP.NET" }
      ],
      info: this.props.info,
      error: this.props.error
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.update = this.update.bind(this);
  }

  update(val) {
    this.props.setTagInput(val);
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState(
      {
        tags: tags.filter((tag, index) => index !== i)
      },
      () => {
        this.update(this.state.tags);
      }
    );
  }

  handleAddition(tag) {
    this.setState(
      state => ({ tags: [...state.tags, tag] }),
      () => {
        this.update(this.state.tags);
      }
    );
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags }, () => {
      this.update(this.state.tags);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error
      });
    }
  }

  render() {
    const { tags, suggestions, info, error } = this.state;
    return (
      <div className="form-group">
        <ReactTags
          classNames={{
            tagInputField: "form-control form-control-lg",
            tag: "badge badge-primary mx-1 my-2"
          }}
          tags={tags}
          placeholder="Add your skills"
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          delimiters={delimiters}
        />
        {info && (
          <small className="form-text text-muted mt-2">
            <i className="fas fa-lightbulb text-primary" /> {info}
          </small>
        )}
        {error && (
          <div className="invalid-feedback" style={{display:"block"}}>
            <i className="fas fa-exclamation-triangle" /> {error}
          </div>
        )}
      </div>
    );
  }
}

export default TagInput;
