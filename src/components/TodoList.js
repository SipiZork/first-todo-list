import React, { Component } from "react";
import '../css/TodoList.css';

class TodoList extends Component {

  render() {
    const { details, id } = this.props;
    return (
      <li className="todo-item" onClick={() => this.props.openTodoList(id)}>{details.name}</li>
    )
  }
}

export default TodoList;
