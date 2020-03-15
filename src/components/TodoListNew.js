import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import ToolTip from './ToolTip';
import '../css/TodoList.css';

class TodoList extends Component {
  openTodoList = id => {
    this.props.openTodoList(id);
    this.props.toggleMenu();
  }

  createTodo = () => {
    const { details, id, index, higherTodo } = this.props;
    return (
      <Fragment>
        <div className="todo-list-container"
          key={this.props.counter}
          index={details.id}
        >
          <div className="list-item" onClick={() => this.openTodoList(index)}>
            <div className="my-handle"><i class="fas fa-sort"></i></div>
            <div className="item-name">{details.name}</div>
          </div>
          <div className="list-remove" onClick={() => this.props.removeListFromTodos(index)}>
            <ToolTip tip="Törlés" position="top" />
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
