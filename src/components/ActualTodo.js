import React, { Component, Fragment } from "react";
import PropType from 'prop-type';
import '../css/ActualTodo.css';

class ActualTodo extends Component {

  listUncompletedItems = key => {
    const item = this.props.actualTodo[key];
    if(typeof(item) === "string"){
      return
    }
    if(item.completed == false)
      return (
        <Fragment>
          <label className="item-container" htmlFor={item.index} onClick={() => this.props.itemCompleted(key)} >{item.text}
              <input type="checkbox" key={key} name={item.index} className="item" onClick={() => this.props.itemCompleted(key)} />
              <span className="checkmark"></span>
          </label>
        </Fragment>
      )

    return
  }

  listCompletedItems = key => {
    const item = this.props.actualTodo[key];
    if(typeof(item) === "string"){
      return
    }
    if(item.completed == true)
      return (
        <Fragment>
          <label className="item-container" htmlFor={item.index} onClick={() => this.props.itemCompleted(key)} >{item.text}
              <input type="checkbox" key={key} name={item.index} className="item" checked="checked" onClick={() => this.props.itemCompleted(key)} />
              <span className="checkmark"></span>
          </label>
        </Fragment>
      )

    return
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
