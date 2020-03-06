import React, { Component, Fragment } from "react";
import TodoList from './TodoList.js';
import TextField from './TextField';

class TodoMenu extends Component {

  state = {
    value: "",
    menu: false,
    classes: "add-todo"
  }

  handleChange = e => {
    let val = e.target.value
    if(val.length > 25) {
      val.substring(0, val.length - 1);
    } else {
      this.setState({ value: val})
    }
    if(val && val !== "") {
      this.setState({ classes: "add-todo focused" });
    } else {
      this.setState({ classes: "add-todo" });
    }
  }

  createTodoList = e => {
    e.preventDefault()
    const list = {
      name: e.target.addTodo.value,
      owner: this.props.user.uid
    }
    this.props.addTodoList(list);
    this.setState({ value: "", classes: "add-todo", menu: false });
    e.target.addTodo.value = "";
    e.target.addTodo.blur();
  }

  toggleMenu = () => {
    this.setState({ menu: !this.state.menu });
  }

  checked = () => {
    if(this.state.menu === true) {
      return "checked";
    } else {
      return "";
    }
  }

  checkOnChange = () => {

  }

  render() {
    return (
      <Fragment>
        <div className="open-menu">
          <input type="checkbox" className="toggler" onClick={this.toggleMenu} checked={this.state.menu === true ? "checked" : ""} onChange={this.checkOnChange}/>
          <div className="hamburger"><div></div></div>
          <div className="menu">
            <div className="user">
              <div className="logout" onClick={this.props.logout}>
                →
              </div>
            </div>
            <div className="todos">
              {/* <p>Listák</p> */}
              {Object.keys(this.props.todos).map(key => (
                <TodoList
                  key={key}
                  id={key}
                  details={this.props.todos[key]}
                  openTodoList={this.props.openTodoList}
                  removeListFromTodos={this.props.removeListFromTodos}
                  user={this.props.user}
                  toggleMenu={this.toggleMenu}
                />
              ))}
              <form className="add-todo-form" onSubmit={(e) => this.createTodoList(e)}>
                <input
                  type="text"
                  name="addTodo"
                  className={this.state.classes}
                  // placeholder="Lista hozzáadása"
                  autoComplete="off"
                  value={this.state.value}
                  onChange={this.handleChange}/>
                {/* <TextField type="text"
                  name="addTodo"
                  className="add-todo"
                  autoComplete="off"
                  value={this.state.value}
                onChange={this.handleChange}></TextField> */}
                <div>Lista hozzáadása</div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TodoMenu;
