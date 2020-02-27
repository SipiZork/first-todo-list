import React, { Component, Fragment } from "react";
import '../css/TodoList.css';

class TodoList extends Component {

  render() {
    const { details, id } = this.props;
    return (
      <Fragment>
        <div className="todo-list-container">
          <div className="list-item" onClick={() => this.props.openTodoList(id)}>
            {details.name}
          </div>
          <div className="list-remove" onClick={() => this.props.removeListFromTodos(id)}>
            X
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TodoList;
