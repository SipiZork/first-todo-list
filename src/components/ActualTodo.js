import React, { Component, Fragment } from "react";
import '../css/ActualTodo.css';
// import TextAreaAutoSize from 'react-autosize-textarea';
import TextField from "@material-ui/core/TextField";
import { TextareaAutosize } from "@material-ui/core";

class ActualTodo extends Component {

  listUncompletedItems = key => {
    const item = this.props.actualTodo[key];
    if(typeof(item) === "string"){
      return
    }
    if(item.completed === false)
      return (
        <Fragment key={key}>
          <div className="item-container">
            <div className="checkmark unchecked" onClick={() => this.props.itemCompleted(key)}></div>
            <div className="item-text" htmlFor={item.index}>
              <form key={key} onSubmit={(e) => this.changeItem(e, item, "onSubmit")} onBlur={(e) => this.changeItem(e, item, "onBlur")}>
                <TextareaAutosize
                  key={key}
                  defaultValue={item.text}
                  autoComplete="off"
                  className="item"
                  onKeyPress={(e) => this.editIteyKeyHandler(e, item)}
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
            <div className="checkmark checked" onClick={() => this.props.itemCompleted(key)}></div>
            <div className="item-text" htmlFor={item.index}>
              <form key={key} onSubmit={(e) => this.changeItem(e, item, "onSubmit")} onBlur={(e) => this.changeItem(e, item, "onBlur")}>
                <TextareaAutosize
                  name="text"
                  key={key}
                  defaultValue={item.text}
                  autoComplete="off"
                  className="item"
                  onKeyPress={(e) => this.editIteyKeyHandler(e, item)}
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

  editIteyKeyHandler = (e, item) => {
    if(e.shiftKey === false && e.key === "Enter") {
      this.changeItem(e, item, "onBlur");
      e.target.blur();
    }
  }

  createItem = (e, handler)=> {
    e.preventDefault();
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

  render() {
    const actualTodo = this.props.actualTodo;
    if(actualTodo !== undefined){
      const todoIds = Object.keys(actualTodo);
      return (
        <Fragment>
          <h2>
            {actualTodo.name} {this.props.user.uid !== actualTodo.owner ? " !! Nem a saját feladat listád !!" : "" }
          </h2>
          <div className="uncompleted-items">
            {todoIds.map(this.listUncompletedItems)}

            <form onSubmit={(e) => this.createItem(e, "submit")}>
              <TextareaAutosize
                name="newItem"
                className="add-item"
                placeholder="Feladat hozzáadása"
                rowsMax={10}
                autoComplete="off"
                onKeyPress={(e) => this.addItemKeyHandler(e)}
                onBlur={(e) => this.createItem(e, "onblur")}
              ></TextareaAutosize>
            </form>
          </div>
          <div className="completed-items">
            {todoIds.map(this.listCompletedItems)}
          </div>
        </Fragment>
      )
    }
    return (
      "Kattins egy létező listára"
    )
  }
}

export default ActualTodo;
