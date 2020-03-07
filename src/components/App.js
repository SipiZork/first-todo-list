import React, { Component, Fragment } from 'react';
// import todos from '../simple-todos';
import TodoMenu from './TodoMenu';
import ActualTodo from './ActualTodo';
import Login from './Login';
import base, { auth } from "../base";
// import firebase from 'firebase';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {

  state = {
    todos: {},
    sharedWithReadTodo: {},
    actualTodo: "",
    login: false,
    user: ""
  }

  loadTodos = localUser => {
    this.ref = base.syncState(`todos/${localUser.uid}`, {
      context: this,
      state: "todos"
    });
  }


   componentDidMount() {
    const { todoId } = this.props.match.params;
    const localUser = JSON.parse(localStorage.getItem("user"));
    if(localUser) {
      this.setState({ user: localUser, login: true}, () => {
        this.loadTodos(localUser);
        const user = this.state.user;
        if(user && user !== "" && user !== null) {
          this.props.history.push(`/${user.uid}`);
          this.setState({ login: true }, () => {
            if(todoId && todoId !== null) {
              this.openTodoList(todoId);
            }
            if(todoId) {
              this.setState({ actualTodo: todoId });
              this.props.history.push(`/${user.uid}/${todoId}`);
            } else {
              this.props.history.push(`/${user.uid}`);
            }
          });
        }
      });
    }
  }

  userLogin = user => {
    this.setState({ login: true, user: user }, () => {
      this.moveUrlTo(`/${user.uid}`);
      this.loadTodos(user);
    });
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
    this.setState({ todos }, () => {
      this.moveToList(listId);
    })
  }

  moveToList = listId => {
    this.setState({ actualTodo: listId }, () => {
      this.openTodoList(listId);
    });
  }


  removeListFromTodos = listId => {
    const todos = { ...this.state.todos };
    todos[listId] = null;
    this.setState({ todos }, () => {
      this.closeTodoList(listId);
    });
  }

  modifyItem = (item, text) => {
    const itemId = 'item' + item.index;
    const todos = { ...this.state.todos };
    todos[this.state.actualTodo][itemId].text = text;
    this.setState({ todos });
  }

  changeName = name => {
    // console.log(this.state.todos[this.state.actualTodo].name);
    const todos = { ...this.state.todos };
    todos[this.state.actualTodo].name = name;
    this.setState({ todos });
    console.log("siker");
  }

  renderActualTodo = renderWhat => {
    if(renderWhat === "full"){
      return (
        <Fragment>
          <div className="actual-todo">
            <ActualTodo
              actualTodo={this.state.todos[this.state.actualTodo]}
              itemCompleted={this.itemCompleted}
              addToActualList={this.addToActualList}
              removeFromActualList={this.removeFromActualList}
              modifyItem={this.modifyItem}
              changeName={this.changeName}
              user={this.state.user}
            />
          </div>
        </Fragment>
      )
    } else {
      return(
        <Fragment>
          <div className="actual-todo">
            <ActualTodo

            />
          </div>
        </Fragment>
      )
    }
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
          {todoId && todoId !== null ? this.renderActualTodo("full") : this.renderActualTodo("empty")}
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
