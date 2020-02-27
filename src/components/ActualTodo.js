import React, { Component, Fragment } from "react";
import '../css/ActualTodo.css';

class ActualTodo extends Component {
  state = {
    value: "",
    tempText: "",
    todo: ""
  }

  listUncompletedItems = key => {
    const item = this.props.actualTodo[key];
    if(typeof(item) === "string"){
      return
    }
    if(item.completed === false)
      return (
        <div className="item-container">
          <div className="checkmark unchecked" onClick={() => this.props.itemCompleted(key)}></div>
          <div className="item-text" htmlFor={item.index}>
            <input type="text" value={item.text} onKeyPress={(e, item) =>this.changeItem(e, item)} className="item"/>
          </div>
          <div className="remove-item" onClick={() => this.props.removeFromActualList(key)}>X</div>
        </div>
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
        <div className="item-container">
          <div className="checkmark checked" onClick={() => this.props.itemCompleted(key)}></div>
          <div className="item-text" htmlFor={item.index}>{item.text}</div>
          <div className="remove-item" onClick={() => this.props.removeFromActualList(key)}>X</div>
        </div>
      )

    return
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
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
    this.props.addToActualList(item);
    this.setState({ value: '' });
  }

  changeItem = (e, item) => {
    console.log(this.state);
  }

  render() {
    const actualTodo = this.props.actualTodo;
    if(actualTodo !== undefined){
      const todoIds = Object.keys(actualTodo);
      return (
        <Fragment>
          <h2>{actualTodo.name}</h2>
          <h3>ToDo:</h3>
          {todoIds.map(this.listUncompletedItems)}
          <form onSubmit={(e) => this.createItem(e)}>
            <input type="text"
              name="newItem"
              className="add-item"
              placeholder="Feladat hozzaaádsa"
              value={this.state.value}
              onChange={this.handleChange}/>
          </form>
          <h3>Done:</h3>
          {todoIds.map(this.listCompletedItems)}
        </Fragment>
      )
    }
    return (
      <p>Kattints  egy listára, hogy betöltsük azt.</p>
    )
  }
}

export default ActualTodo;
