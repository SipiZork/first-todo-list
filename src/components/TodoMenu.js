import React, { Component, Fragment } from "react";
import TodoList from './TodoListNew';
// import { Sortable } from '@progress/kendo-react-sortable';
// import TextField from './TextField';
import ToolTip from './ToolTip';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

class TodoMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      menu: false,
      classes: "add-todo textfield",
      tooltip: "",
      grabTodo: "",
      dropTodo: "",
      last: false
    }
  }

  componentWillMount(){
    this.checkResizeWindow();
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.checkResizeWindow());
    let dest = document.querySelector('.todos');
    Sortable.create(dest, {
      animation: 150,
      handle: ".my-handle",
      filter: ".add-todo",
      onEnd: this.onEnd = (e) =>  {
        let newOrder = [];
        const todosDivs = dest.childNodes;
        todosDivs.forEach(todo => {
          newOrder.push(parseInt(todo.getAttribute("index")));
        });
        this.props.changeOrder(newOrder);
      }
    });

  }

  setGrabTodo = id => {
    this.setState({ grabTodo: id });
  }

  setDropTodo = id => {
    this.setState({ dropTodo: id });
  }

  changeOrder = last => {
    const grabTodo = this.state.grabTodo;
    const dropTodo = this.state.dropTodo;
    if(grabTodo === dropTodo) {
      console.log("Nincs változás");
    } else {
      console.log(`Be kell raknia a ${grabTodo}-t a ${dropTodo} elé`);
      this.props.changeTodoOrder(grabTodo, dropTodo, this.state.last);
    }
  }

  checkResizeWindow = () => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 768){
      this.setState({ tooltip: "left" });
    } else if((window.innerWidth > 768)) {
      this.setState({ tooltip: "right" });
    }
    console.log(this.props);
  }

  handleChange = e => {
    let val = e.target.value
    if(val.length > 25) {
      val.substring(0, val.length - 1);
    } else {
      this.setState({ value: val})
    }
    if(val && val !== "") {
      this.setState({ classes: "add-todo textfield focused" });
    } else {
      this.setState({ classes: "add-todo textfield" });
    }
  }

  createTodoList = e => {
    e.preventDefault()
    const nextId = this.props.higherTodo + 1;
    const list = {
      id: nextId,
      name: e.target.addTodo.value,
      index: `todo${Date.now()}`,
      owner: this.props.user.uid
    }
    this.props.addTodoList(list);
    this.setState({ value: "", classes: "add-todo textfield", menu: false });
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

  setLast = last => {
    this.setState({ last: last });
  }

  render() {

    const array = Object.keys(this.props.todos).map(key => {
      return [this.props.todos[key]];
    });
    array.sort((a,b) => {
      const first = a[0].id;
      const second = b[0].id;
      // console.log(`${first} - ${second}`);
      if(first < second) {
        return -1;
      }
      if(first > second) {
        return 1;
      }
      return "";
    });
    const TodosInOrder = Object.keys(array).map(key => {
      return array[key][0].index;
    });
    const { todos, higherTodo } = this.props;
    return (
      <Fragment>
        <div className="open-menu">
          <input
            type="checkbox"
            className="toggler"
            onClick={this.toggleMenu}
            checked={this.state.menu === true ? "checked" : ""}
            onChange={this.checkOnChange}/>
          <div className="hamburger"><div></div></div>
          <div className="menu">
            <div className="user">
              <div className="logout" onClick={this.props.logout}>
                <i className="fas fa-sign-out-alt"></i>
                <ToolTip tip="Kijelentkezés" position={this.state.tooltip}/>
              </div>
            </div>
            <div className="todos">
              {/* <p>Listák</p> */}
              {/* {console.log("todos:")} */}
              {/* {console.log(this.props.todos)} */}
              {Object.keys(TodosInOrder).map(key => (
                <TodoList
                  key={todos[TodosInOrder[key]].index}
                  index={todos[TodosInOrder[key]].index}
                  id={todos[TodosInOrder[key]].id}
                  details={todos[TodosInOrder[key]]}
                  higherTodo={higherTodo}
                  openTodoList={this.props.openTodoList}
                  removeListFromTodos={this.props.removeListFromTodos}
                  user={this.props.user}
                  toggleMenu={this.toggleMenu}
                  setGrabTodo={this.setGrabTodo}
                  setDropTodo={this.setDropTodo}
                  changeOrder={this.changeOrder}
                  setLast={this.setLast}
                  grabId={this.state.grabTodo}
                  dropId={this.state.dropTodo}
                />
              ))}
            </div>
            <form className="add-todo-form textfield-form" onSubmit={(e) => this.createTodoList(e)}>
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
      </Fragment>
    )
  }
}

export default TodoMenu;
