import React, { Component, Fragment } from 'react';
// import todos from '../simple-todos';
import TodoMenu from './TodoMenu';
import ActualTodo from './ActualTodo';
import Login from './Login';
import base, { auth } from "../base";

class App extends Component {

  state = {
    todos: {},
    actualTodo: "",
    login: false,
    user: ""
  }

  componentWillMount() {
    const { todoId } = this.props.match.params;
    console.log(todoId);
    const localUser = JSON.parse(localStorage.getItem("user"));
    if(localUser) {
      console.log(`Van localUser: ${localUser}`);
      this.setState({ user: localUser});
      this.setState({ login: true });
      this.loadTodos();
    }
    // if(user && user !== "" && user !== null) {
    //   const { uid } = this.state.user;
    //   console.log("helllo");
    //   this.props.history.push(`/${uid}`);
    //
    // }
  }

  loadTodos = () => {
    console.log("todo");
    this.ref = base.syncState("todos", {
      context: this,
      state: "todos"
    });
  }


   componentDidMount() {
    const { todoId } = this.props.match.params;
    const user = this.state.user;
    if(user && user !== "" && user !== null) {
      console.log(user);
      const { uid } = this.state.user;
      console.log("helllo");
      this.props.history.push(`/${uid}`);
      this.setState({ login: true });
    }
    if(todoId && todoId !== null) {
      this.openTodoList(todoId);
    }
  }

  // componentWillUnmount() {
  //   base.removeBinding(this.ref);
  // }

  toggleLogin = () => {
    this.setState({ login: !this.state.login});
    this.ref = base.syncState("todos", {
      context: this,
      state: "todos"
    });
  }

  userLogin = user => {
    this.setState({ login: true});
    this.setState({ user: user });
    this.moveUrlTo(`/${user.uid}`);
  }

  userLogout = () => {
    auth.signOut();
    localStorage.removeItem("user");
    this.setState({ user: "" });
    this.props.history.push("/");
    this.setState({ login: false });
  }

  openTodoList = key => {
    const { userId } = this.props.match.params;
    this.setState({ actualTodo: key });
    this.props.history.push(`/${userId}/${key}`);
  }

  closeTodoList = listId => {
    const { userId } = this.props.match.params;
    console.log(`listId:${listId}, this.state.actualTodo:${this.state.actualTodo}`);
    if(listId === this.state.actualTodo) {
      this.props.history.push(`/${userId}/`);
      this.setState({ actualTodo: "" });
    }

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
    todos[this.state.actualTodo][`item${item.index}`] = item
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
    this.moveToList(listId);
  }

  moveToList = listId => {
    this.setState({ actualTodo: listId });
    this.openTodoList(listId);
  }


  removeListFromTodos = listId => {
    const todos = { ...this.state.todos };
    todos[listId] = null;
    this.setState({ todos });
    this.closeTodoList(listId);
  }

  // overWriteItem = (item, newText) => {
  //   const itemId = 'item' + item.index;
  //   const todos = { ...this.state.todos };
  //   todos[this.state.actualTodo][itemId].text = newText;
  //   this.setState({ todos });
  // }

  modifyItem = (item, text) => {
    const itemId = 'item' + item.index;
    const todos = { ...this.state.todos };
    todos[this.state.actualTodo][itemId].text = text;
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
            user={this.state.user}
          />
        </div>
      </Fragment>
    )
  }

  trying = () => {
    return (
      <Fragment>
        <div className="actual-todo">
          <p>Kattints  egy listára, hogy betöltsük azt, vagy hozz létre egy új listát!</p>
        </div>
      </Fragment>
    )
  }

  moveUrlTo = (path) => {
    this.props.history.push(path);
  }

  renderContent = () => {
    const { login } = this.state;
    const { todoId } = this.props.match.params;
    if(login === false){
      return (
        <Login
          match={this.props.match}
          moveUrlTo={this.moveUrlTo}
          user={this.state.user}
          login={this.userLogin}
        />
      )
    } else {
      return(
        <Fragment>
          <TodoMenu
            openTodoList={this.openTodoList}
            todos={this.state.todos}
            addTodoList={this.addTodoList}
            removeListFromTodos={this.removeListFromTodos}
            user={this.state.user}
            logout={this.userLogout}
          />
          {todoId && todoId !== null ? this.renderActualTodo() : this.trying()}
        </Fragment>
      )
    }
  }

  render() {

    return (
      <Fragment>
        {this.renderContent()}
      </Fragment>
    );
  }
}

export default App;
