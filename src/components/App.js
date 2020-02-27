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
      state: "todos"
    });
  }

  openTodoList = key => {
    const { userId, todoListId } = this.props.match.params;
    this.setState({ actualTodo: key });
    this.props.history.push(`/${userId}/${todoListId}/${key}`);
  }

  closeTodoList = () => {
    const { userId, todoListId } = this.props.match.params;
    this.props.history.push(`/${userId}/${todoListId}/`);
    this.setState({ actualTodo: "" });
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
    const { userId, todoListId, todoId } = this.props.match.params;
    const todos = { ...this.state.todos };
    todos[listId] = null;
    this.setState({ todos });
    this.closeTodoList();
  }

  // overWriteItem = (item, newText) => {
  //   const itemId = 'item' + item.index;
  //   const todos = { ...this.state.todos };
  //   todos[this.state.actualTodo][itemId].text = newText;
  //   this.setState({ todos });
  // }

  modifyItem = (item, letter) => {
    const itemId = 'item' + item.index;
    const todos = { ...this.state.todos};
    const newText = item.text + letter;
    todos[this.state.actualTodo][itemId].text = newText;
    this.setState({ todos });
  }

  renderActualTodo = () => {
    return (
      <Fragment>
        <div className="actual-todo">
          <ActualTodo
            actualTodo={this.state.todos[this.state.actualTodo]}
            itemCompleted={this.itemCompleted}
            addToActualList={this.addToActualList}
            removeFromActualList={this.removeFromActualList}
            modifyItem={this.modifyItem}
          />
        </div>
      </Fragment>
    )
  }

  trying = () => {
    return (
      <Fragment>
        <div className="actual-todo">
          Kattints egy listára, hogy betöltsük azt!
        </div>
      </Fragment>
    )
  }

  render() {
    const { todoId } = this.props.match.params;
    return (
      <Fragment>
        <TodoMenu
          openTodoList={this.openTodoList}
          todos={this.state.todos}
          addTodoList={this.addTodoList}
          removeListFromTodos={this.removeListFromTodos}
        />
        {todoId && todoId !== null ? this.renderActualTodo() : this.trying()}
      </Fragment>
    );
  }
}

export default App;
