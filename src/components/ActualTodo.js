import React, { Component, Fragment } from "react";
import '../css/ActualTodo.css';
// import TextAreaAutoSize from 'react-autosize-textarea';
// import TextField from "@material-ui/core/TextField";
import { TextareaAutosize } from "@material-ui/core";
import ToolTip from './ToolTip';

class ActualTodo extends Component {
  state = {
      name: "",
      first: true,
      classes: "add-item textfield"
    }

  componentDidUpdate(prevProps) {
    if(this.props.actualTodo !== undefined){
      if(prevProps.actualTodo !== this.props.actualTodo ) {
        this.setState({first: false, name: this.props.actualTodo.name});
      }
    }
  }

  listUncompletedItems = key => {
    const item = this.props.actualTodo[key];
    if(typeof(item) === "string"){
      return
    }
    if(item.completed === false)
      return (
        <Fragment key={key}>
          <div className="item-container">
            <div className="checkmark unchecked" onClick={() => this.props.itemCompleted(key)}>
              <ToolTip tip="Kész" classes="kesz" position="top" />
            </div>
            <div className="item-text" htmlFor={item.index}>
              <form key={key} onSubmit={(e) => this.changeItem(e, item, "onSubmit")} onBlur={(e) => this.changeItem(e, item, "onBlur")}>
                <TextareaAutosize
                  key={key}
                  defaultValue={item.text}
                  autoComplete="off"
                  className="item"
                  onKeyPress={(e) => this.editItemKeyHandler(e, item)}
                >
                </TextareaAutosize>
              </form>
            </div>
            <div className="remove-item" onClick={() => this.props.removeFromActualList(key)}></div>
          </div>
        </Fragment>
      )

    return
  }

  listCompletedItems = key => {
    const item = this.props.actualTodo[key];
    if(typeof(item) === "string"){
      return
    }
    if(item.completed === true)
    return (
      <Fragment key={key}>
        <div className="item-container">
          <div className="checkmark checked" onClick={() => this.props.itemCompleted(key)}>
            <ToolTip tip="Mégse" position="top" />
          </div>
          <div className="item-text" htmlFor={item.index}>
            <form key={key} onSubmit={(e) => this.changeItem(e, item, "onSubmit")} onBlur={(e) => this.changeItem(e, item, "onBlur")}>
              <TextareaAutosize
                name="text"
                key={key}
                defaultValue={item.text}
                autoComplete="off"
                className="item"
                onKeyPress={(e) => this.editItemKeyHandler(e, item)}
                >
                </TextareaAutosize>
              </form>
            </div>
            <div className="remove-item" onClick={() => this.props.removeFromActualList(key)}></div>
          </div>
        </Fragment>
      )

    return
  }

  addItemKeyHandler = e => {
    if(e.shiftKey === false && e.key === "Enter") {
      this.createItem(e, "Enter")
    }
  }

  addItemChangeHandler = e => {
    const val = e.target.value.length;
    if(val > 0) {
      this.setState({ classes: "add-item textfield focused" });
    } else {
      this.setState({ classes: "add-item textfield" });
    }
  }

  editItemKeyHandler = (e, item) => {
    if(e.shiftKey === false && e.key === "Enter") {
      this.changeItem(e, item, "onBlur");
      e.target.blur();
    }
  }


  createItem = (e, handler)=> {
    e.preventDefault();
    this.setState({ classes: "add-item textfield" });
    const text = handler === "submit" ? e.target.newItem.value : e.target.value;
    if(text && text !== ""){
      const item = {
        index: Date.now(),
        text: text,
        completed: false
      }
      if(handler === "submit") {
        e.target.newItem.value = "";
      } else {
         e.target.value = "";
      }
      this.props.addToActualList(item);
    }
  }

  changeItem = (e, item, onHow) => {
    e.preventDefault();
    let newText = "";
    if(onHow === "onSubmit"){
      newText = e.target.text.value;
      e.target.text.blur();
    } else if(onHow === "onBlur"){
      newText = e.target.value;
    }
    this.props.modifyItem(item, newText);
  }

  changeNameHandler = e => {
    let val = e.target.value;
    if(val.length > 25) {
      val.substring(0, val.length - 1);
    } else {
      this.setState({ name: val})
    }
  }

  changeName = (e, onHow) => {
    e.preventDefault();
    let text = ""
    if(onHow === "submit"){
      text = e.target.name.value;
      e.target.name.blur();
    } else if(onHow === "blur") {
      text = e.target.value;
    }
    if( text.length > 0 && text.length < 26) {
      this.props.changeName(text)
    } else {
      this.setState({
        name: this.props.actualTodo.name
      });
    }
  }

  render() {
    const actualTodo = this.props.actualTodo;
    if(actualTodo !== undefined){
      // {this.loadName(actualTodo)}
      const todoIds = Object.keys(actualTodo);
      return (
        <Fragment>
          <form className="item-title" onSubmit={(e) => this.changeName(e, "submit")}>
            <input
              type="text"
              name="name"
              className="title"
              value={this.state.name}
              autoComplete="off"
              onChange={(e) => this.changeNameHandler(e)}
              onBlur={(e) => this.changeName(e, "blur")}
            />
            <div>Cím</div>
          </form>
          <div className="uncompleted-items">
            {todoIds.map(this.listUncompletedItems)}

            <form className="textfield-form" onSubmit={(e) => this.createItem(e, "submit")}>
              <TextareaAutosize
                name="newItem"
                className={this.state.classes}
                autoComplete="off"
                onChange={(e) => this.addItemChangeHandler(e)}
                onKeyPress={(e) => this.addItemKeyHandler(e)}
                onBlur={(e) => this.createItem(e, "onblur")}
              ></TextareaAutosize>
              <div>Feladat hozzáadása</div>
            </form>
          </div>
          <div className="completed-items">
            {todoIds.map(this.listCompletedItems)}
          </div>
        </Fragment>
      )
    }
    return (
      <div className="actual-todo-error">
        Kattins egy létező listára vagy hozz lére egyet új listát!
      </div>
    )
  }
}

export default ActualTodo;
