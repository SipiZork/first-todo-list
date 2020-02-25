import React, { Component, Fragment } from "react";
import '../css/ActualTodo.css';

class ActualTodo extends Component {
  state = {
    value: ""
  }

  listUncompletedItems = key => {
    const item = this.props.actualTodo[key];
    if(typeof(item) === "string"){
      return
    }
    if(item.completed === false)
      return (
        <div className="test">
          <label className="item-container" htmlFor={item.index} onClick={() => this.props.itemCompleted(key)} >{item.text}
            <input type="checkbox" key={key} name={item.index} className="item" onClick={() => this.props.itemCompleted(key)} />
            <span className="checkmark"></span>

          </label>
          <span className="remove-item" onClick={() => this.props.removeFromActualList(key)}>X</span>
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
        <div className="test">
          <label className="item-container" htmlFor={item.index} onClick={() => this.props.itemCompleted(key)} >{item.text}
            <input type="checkbox" key={key} name={item.index} className="item" checked="checked" onClick={() => this.props.itemCompleted(key)} />
            <span className="checkmark"></span>
          </label>
          <span className="remove-item" onClick={() => this.props.removeFromActualList(key)}>X</span>
        </div>
      )

    return
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  }

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
