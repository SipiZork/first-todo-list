import React, { Component, Fragment } from 'react';
// import todos from '../simple-todos';
import TodoMenu from './TodoMenu';
import ActualTodo from './ActualTodo';
import base from "../base";

class App extends Component {

  state = {
    todos: {},
    actualTodo: ""
  }

  componentDidMount() {
    this.ref = base.syncState("todos", {
      context: this,
      state: "todos" });
  }

  openTodoList = key => {
    this.setState({ actualTodo: key });
  }

  itemCompleted = key => {
    const todos = {...this.state.todos };
    const completed = todos[this.state.actualTodo][key].completed;
    if(completed) {
      todos[this.state.actualTodo][key].completed = false;
    } else {
      todos[this.state.actualTodo][key].completed = true
    }
    // if(todos[this.state.actualTodo][key].completed == true){
    //   todos[this.state.actualTodo][key].completed = false;
    // } else {
    //   todos[this.state.actualTodo][key].completed = true
    // }
    this.setState({todos});
  }

  addToActualList = item => {
    const todos = { ...this.state.todos };
    todos[this.state.actualTodo][`item${Date.now()}`] = item
    this.setState({ todos });
  }

  removeFromActualList = key => {
    const todos = { ...this.state.todos };
    todos[this.state.actualTodo][key] = null;
    this.setState({ todos });
  }

  addTodoList = list => {
    const todos = { ...this.state.todos };
    const listId = `todo${Date.now()}`;
    todos[listId] = list;
    this.setState({ todos })
    this.moveToNewList(listId);
  }

  moveToNewList = listId => {
    this.setState({ actualTodo: listId });
    this.openTodoList(listId);
  }


  removeListFromTodos = listId => {
    const todos = { ...this.state.todos };
    todos[listId] = null;
    this.setState({ todos });
  }

  // overWriteItem = (item, newText) => {
  //   const itemId = 'item' + item.index;
  //   const todos = { ...this.state.todos };
  //   todos[this.state.actualTodo][itemId].text = newText;
  //   this.setState({ todos });
  // }

  render() {
    return (
      <Fragment>
        <TodoMenu
          openTodoList={this.openTodoList}
          todos={this.state.todos}
          addTodoList={this.addTodoList}
          removeListFromTodos={this.removeListFromTodos}
        />
        <div className="actual-todo">
          <ActualTodo
            actualTodo={this.state.todos[this.state.actualTodo]}
            itemCompleted={this.itemCompleted}
            addToActualList={this.addToActualList}
            removeFromActualList={this.removeFromActualList}
            overWriteItem={this.overWriteItem}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
