import React, { Component, Fragment } from "react";
import ToolTip from './ToolTip';
import '../css/TodoList.css';

class TodoList extends Component {

  state = {
    dragClasses: 'todo-list-draggable',
  }

  openTodoList = id => {
    this.props.openTodoList(id);
    this.props.toggleMenu();
  }

  dragStart = (e, id) => {
    this.props.setGrabTodo(id);
    console.log(id);
    this.setState({ dragClasses: 'todo-list-draggable hold' }, () => {
      setTimeout(() => this.setState({ dragClasses: 'todo-list-draggable invisible hold' }), 0);
    });
  }

  dragEnd = e => {
    this.setState({ dragClasses: 'todo-list-draggable' });
    this.props.changeOrder(false);
  }

  dragEndLast = e => {
    this.setState({ dragClasses: 'todo-list-draggable' });
    this.props.changeOrder();
  }

  dragEnter = (e, id, last) => {
    this.props.setDropTodo(id);
    this.props.setLast(last);
  }

  dragOver = e => {
    // console.log(this.state.last);
    // this.setState({ dragClasses: 'todo-list-draggable droppable'});
  }

  dragLeave = e => {

  }

  createTodo = () => {
    const { details, index, id, higherTodo } = this.props;
    const afterLastTodo= (id === higherTodo
      ? <div className="droppable last"
        onDragEnter={(e) => this.dragEnter(e, id, true)}
        onDragLeave={(e) => this.dragLeave(e, id)}>
      </div> : ""
    );
    return (
      <Fragment>
        <div className="droppable"
          onDragEnter={(e) => this.dragEnter(e, id, false)}
          onDragLeave={(e) => this.dragLeave(e, id)}>
        </div>
        <div
          className={this.state.dragClasses}
          draggable="true"
          onDragStart={(e) => this.dragStart(e, id)}
          onDragEnd={(e) => this.dragEnd(e, id)}
        >
          <div className="todo-list-container" index={id}>
            <div className="list-item" onClick={() => this.openTodoList(index)}>
              {details.name}
            </div>
            <div className="list-remove" onClick={() => this.props.removeListFromTodos(index)}>
              <ToolTip tip="Törlés" position="top" />
            </div>
          </div>
        </div>
        {afterLastTodo}
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
