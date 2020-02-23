import React, { Component, Fragment } from "react";
import PropType from 'prop-type';

class ActualTodo extends Component {

  listItems = key => {
    const item = this.props.actualTodo[key];
    const checked = item.completed == true ? 'checked' : '';
    if(typeof(item) === "string"){
      return
    }
      return (
        <Fragment>
        <input type="checkbox" key={key} name={item.index} className="list-item" checked={checked} onClick={() => this.props.itemCompleted(key)} />
        <label htmlFor={item.index} onClick={() => this.props.itemCompleted(key)} >{item.text}</label>
        <br />
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
          {todoIds.map(this.listItems)}
        </Fragment>
      )
    }
    return (
      <p>Kattints  egy listára, hogy betöltsük azt.</p>
    )
  }
}

export default ActualTodo;
