import React, { Component, Fragment } from 'react';
import todos from '../simple-todos';
import TodoList from './TodoList';
import ActualTodo from './ActualTodo';

class App extends Component {

  state = {
    todos: {},
    actualTodo: ""
  }

  componentDidMount() {
    this.setState({todos: todos });
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
    delete todos[this.state.actualTodo][key];
    this.setState({ todos });
  }

  render() {
    return (
      <Fragment>
        <div className="menu">
          <ul className="todos">
            <p>Listák</p>
            {Object.keys(this.state.todos).map(key => (
              <TodoList key={key}
                id={key}
                details={this.state.todos[key]}
                openTodoList={this.openTodoList}
              />
            ))}

          </ul>
        </div>
        <div className="actual-todo">
          <ActualTodo
            actualTodo={this.state.todos[this.state.actualTodo]}
            itemCompleted={this.itemCompleted}
            addToActualList={this.addToActualList}
            removeFromActualList={this.removeFromActualList}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
