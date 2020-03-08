import React, { Component, Fragment } from "react";
import '../css/TodoList.css';

class TodoList extends Component {

  openTodoList = id => {
    this.props.openTodoList(id);
    this.props.toggleMenu();
  }

  move = e => {
    console.log(e.target.parentElement);
  }

  createTodo = () => {
    const { details, id } = this.props;
    return (
      <Fragment>
        <div className="todo-list-container" index={details.id} onMouseDown={(e) => this.move(e)}>
          <div className="list-item" onClick={() => this.openTodoList(id)}>
            {details.name}
          </div>
          <div className="list-remove" onClick={() => this.props.removeListFromTodos(id)}>
          </div>
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <Fragment>
        {this.createTodo()}
      </Fragment>
    )
  }
}

export default TodoList;
