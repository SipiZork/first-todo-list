import React, { Component, Fragment } from "react";
import TodoList from './TodoList.js'

class TodoMenu extends Component {

  state = {
    value: ""
  }

  handleChange = e => {
    this.setState({ value: e.target.value})
  }

  createTodoList = e => {
    e.preventDefault()
    const list = {
      name: e.target.addTodo.value,
      owner: this.props.user.uid
    }
    this.props.addTodoList(list);
    this.setState({ value: "" });
  }

  render() {
    return (
      <Fragment>
        <div className="menu">
          <div className="user">
            <div className="logout" onClick={this.props.logout}>
              X
            </div>
            <div className="user-email">
              {this.props.user.email}
            </div>
          </div>
          <div className="todos">
            <p>Listák</p>
            {Object.keys(this.props.todos).map(key => (
              <TodoList
                key={key}
                id={key}
                details={this.props.todos[key]}
                openTodoList={this.props.openTodoList}
                removeListFromTodos={this.props.removeListFromTodos}
                user={this.props.user}
              />
            ))}
            <form onSubmit={(e) => this.createTodoList(e)}>
              <input
                type="text"
                name="addTodo"
                className="add-todo"
                placeholder="Lista hozzáadása"
                autoComplete="off"
                value={this.state.value}
                onChange={this.handleChange}/>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TodoMenu;
