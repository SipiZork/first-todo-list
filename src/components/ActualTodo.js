import React, { Component, Fragment } from "react";
import '../css/ActualTodo.css';

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
                <input type="text" name="text" key={key} defaultValue={item.text} autoComplete="off" className="item"/>
              </form>
            </div>
            <div className="remove-item" onClick={() => this.props.removeFromActualList(key)}>X</div>
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
                <input type="text" name="text" key={key} defaultValue={item.text} autoComplete="off" className="item"/>
              </form>
            </div>
            <div className="remove-item" onClick={() => this.props.removeFromActualList(key)}>X</div>
          </div>
        </Fragment>
      )

    return
  }

  // keyHandler = (e, item) => {
  //   const newText = e.currentTarget.textContent;
  //   if(e.shiftKey === true && e.key === "Enter") {
  //
  //   } else if(e.key === "Enter") {
  //     this.props.overWriteItem(item, newText);
  //   }
  // }

  createItem = e => {
    e.preventDefault();
    const item = {
      index: Date.now(),
      text: e.target.newItem.value,
      completed: false
    }
    e.target.newItem.value = "";

    this.props.addToActualList(item);
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
          <h3>ToDo:</h3>
          {todoIds.map(this.listUncompletedItems)}
          <form onSubmit={(e) => this.createItem(e)}>
            <input type="text"
              name="newItem"
              className="add-item"
              placeholder="Feladat hozzaaádsa"
              autoComplete="off"
            />
          </form>
          <h3>Done:</h3>
          {todoIds.map(this.listCompletedItems)}
        </Fragment>
      )
    }
    return (
      ""
    )
  }
}

export default ActualTodo;
