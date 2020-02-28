import React, { Component } from "react";
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
      name: e.target.addTodo.value
    }
    this.props.addTodoList(list);
    this.setState({ value: "" });
  }

  render() {
    return (
        <div className="menu">
          <div className="todos">
            <p>Listák</p>
            {Object.keys(this.props.todos).map(key => (
              <TodoList
                key={key}
                id={key}
                details={this.props.todos[key]}
                openTodoList={this.props.openTodoList}
                removeListFromTodos={this.props.removeListFromTodos}
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
    )
  }
}

export default TodoMenu;
