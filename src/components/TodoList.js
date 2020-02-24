import React, { Component, Fragment } from "react";
import '../css/TodoList.css';

class TodoList extends Component {

  render() {
    const { details, id } = this.props;
    return (
      <Fragment>
        <div className="todo-item" onClick={() => this.props.openTodoList(id)}>
          <p className="list-name">{details.name}</p>
          <span className="remove-list" onClick={() => this.props.removeListFromTodos(id)}>X</span>
        </div>
      </Fragment>
    )
  }
}

export default TodoList;
