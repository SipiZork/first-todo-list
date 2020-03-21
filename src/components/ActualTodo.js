import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import Item from './Item'
import '../css/ActualTodo.css';
import TextAreaAutoSize from 'react-autosize-textarea';
// import TextField from "@material-ui/core/TextField";
// import { TextareaAutosize } from "@material-ui/core";
import ToolTip from './ToolTip';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

class ActualTodo extends Component {
  state = {
      name: "",
      first: true,
      classes: "add-item textfield",
      sortable :false,
      itemClasses: "uncompleted-items",
      uncompletedListClasses: "uncompleted-items",
      uncompletedSortableListClasses: "movable-uncompleted-items hide",
      higherItem: 0,
      loaded: false,
      order: []
    }
  sortableRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if(this.props.actualTodo !== undefined){
      if(prevProps.actualTodo !== this.props.actualTodo ) {
        let higherId = 0;
        let id = 0;
        // console.log(this.props.actualTodo);
        Object.keys(this.props.actualTodo).map(key => {
          if(typeof(this.props.actualTodo[key].completed) === "boolean") {
            if(this.props.actualTodo[key].id > higherId) {
              higherId = this.props.actualTodo[key].id;
            }
          }
        });
        const actualTodo = this.props.actualTodo;
        let ItemsInOrder = [];
        let array = [];
        Object.keys(actualTodo).map(key => {
          const item = actualTodo[key];
          if(typeof(item.completed) === "boolean") {
            array.push(item);
          }
        });
        array.sort((a,b) => {
          const first = a.id;
          const second = b.id;
          if(first < second){
            return -1;
          }
          if(first > second) {
            return 1;
          }
          return "";
        });
        ItemsInOrder = Object.keys(array).map(key => {
          return `item${array[key].index}`;
        });
        this.setState({order: ItemsInOrder }, () => console.log(this.state.order));
        // console.log(ItemsInOrder);
        this.setState({first: false, name: this.props.actualTodo.name, higherItem: higherId });
      }
    }
    if(this.state.loaded === false) {
      const node = this.sortableRef.current;
      if(node && node !== null){
        this.setState({ loaded: true }, () => {
          Sortable.create(node, {
            animate: 150,
            draggable: '.movable-item-container'
          });
        });
      }
    }
  }

  createItem = (e, handler)=> {
    e.preventDefault();
    this.setState({ classes: "add-item textfield" });
    const text = handler === "submit" ? e.target.newItem.value : e.target.value;
    if(text && text !== ""){
      const item = {
        id: this.state.higherItem + 1,
        index: Date.now(),
        text: text,
        completed: false
      }
      if(handler === "submit") {
        e.target.newItem.value = "";
      } else {
         e.target.value = "";
      }
      this.props.addToActualList(item);
    }
  }

  addItemKeyHandler = e => {
    if(e.shiftKey === false && e.key === "Enter") {
      this.createItem(e, "Enter")
    }
  }

  addItemChangeHandler = e => {
    const val = e.target.value.length;
    if(val > 0) {
      this.setState({ classes: "add-item textfield focused" });
    } else {
      this.setState({ classes: "add-item textfield" });
    }
  }

  changeNameHandler = e => {
    let val = e.target.value;
    if(val.length > 25) {
      val.substring(0, val.length - 1);
    } else {
      this.setState({ name: val})
    }
  }

  changeName = (e, onHow) => {
    e.preventDefault();
    let text = ""
    if(onHow === "submit"){
      text = e.target.name.value;
      e.target.name.blur();
    } else if(onHow === "blur") {
      text = e.target.value;
    }
    if( text.length > 0 && text.length < 26) {
      this.props.changeName(text)
    } else {
      this.setState({
        name: this.props.actualTodo.name
      });
    }
  }

  sortable = () => {
    const actualTodo = this.props.actualTodo;
    const todoIds = Object.keys(actualTodo);
    this.setState({ sortable: !this.state.sortable }, () => {
      const { sortable } = this.state;
      if(sortable === false){
        this.setState({ uncompletedListClasses: "uncompleted-items", uncompletedSortableListClasses: "movable-uncompleted-items hide"});
      }
      if(sortable === true) {
        this.setState({ uncompletedListClasses: "uncompleted-items hide", uncompletedSortableListClasses: "movable-uncompleted-items"});
      }
    });
  }

  sortableChange = () => {

  }

  renderOrder = () => {

  }

  render() {
    const actualTodo = this.props.actualTodo;
    if(actualTodo !== undefined){
      // {this.loadName(actualTodo)}
      const todoIds = Object.keys(actualTodo);
      return (
        <Fragment>
          <form className="item-title" onSubmit={(e) => this.changeName(e, "submit")}>
            <input
              type="text"
              name="name"
              className="title"
              value={this.state.name}
              autoComplete="off"
              onChange={(e) => this.changeNameHandler(e)}
              onBlur={(e) => this.changeName(e, "blur")}
            />
            <div>Cím</div>
          </form>
          <input
            type="checkbox"
            checked={this.state.sortable}
            onClick={this.sortable}
            onChange={this.sortableChange}
          />
          <div className={this.state.uncompletedListClasses}>
            {Object.keys(this.state.order).map(key => (
              <Item
                key={key}
                item={actualTodo[this.state.order[key]]}
                changeItem={this.changeItem}
                itemCompleted={this.props.itemCompleted}
                editItemKeyHandler={this.editItemKeyHandler}
                removeFromActualList={this.props.removeFromActualList}
                modifyItem={this.props.modifyItem}
                items="uncompleted"
              />
            ))}
            {/* {todoIds.map(this.listUncompletedItems)} */}
            <form className="textfield-form" onSubmit={(e) => this.createItem(e, "submit")}>
              <TextAreaAutoSize
                name="newItem"
                className={this.state.classes}
                autoComplete="off"
                onChange={(e) => this.addItemChangeHandler(e)}
                onKeyPress={(e) => this.addItemKeyHandler(e)}
                onBlur={(e) => this.createItem(e, "onblur")}
              ></TextAreaAutoSize>
              <div>Feladat hozzáadása</div>
            </form>
          </div>
          <div className={this.state.uncompletedSortableListClasses} ref={this.sortableRef}>
            {Object.keys(this.state.order).map(key => (
              <Item
                key={key}
                item={actualTodo[this.state.order[key]]}
                changeItem={this.changeItem}
                itemCompleted={this.props.itemCompleted}
                editItemKeyHandler={this.editItemKeyHandler}
                removeFromActualList={this.props.removeFromActualList}
                modifyItem={this.props.modifyItem}
                items="sortable"
              />
            ))}
            <form className="textfield-form" onSubmit={(e) => this.createItem(e, "submit")}>
              <TextAreaAutoSize
                name="newItem"
                className={this.state.classes}
                autoComplete="off"
                onChange={(e) => this.addItemChangeHandler(e)}
                onKeyPress={(e) => this.addItemKeyHandler(e)}
                onBlur={(e) => this.createItem(e, "onblur")}
              ></TextAreaAutoSize>
              <div>Feladat hozzáadása</div>
            </form>
          </div>
          <div className="completed-items">
            {Object.keys(this.state.order).map(key => (
              <Item
                key={key}
                item={actualTodo[this.state.order[key]]}
                changeItem={this.changeItem}
                itemCompleted={this.props.itemCompleted}
                editItemKeyHandler={this.editItemKeyHandler}
                removeFromActualList={this.props.removeFromActualList}
                modifyItem={this.props.modifyItem}
                items="completed"
              />
            ))}
          </div>
        </Fragment>
      )
    }
    return (
      <div className="actual-todo-error">
        Kattins egy létező listára vagy hozz lére egyet új listát!
      </div>
    )
  }
}

export default ActualTodo;
