import React, { Component, Fragment } from "react";
import ToolTip from './ToolTip';
import TextAreaAutoSize from 'react-autosize-textarea';


class Item extends Component {

  changeItem = (e, item, onHow) => {
    e.preventDefault();
    let newText = "";
    if(onHow === "onSubmit"){
      newText = e.target.text.value;
      e.target.text.blur();
    } else if(onHow === "onBlur"){
      newText = e.target.value;
    }
    this.props.modifyItem(item, newText);
  }

  editItemKeyHandler = (e, item) => {
    if(e.shiftKey === false && e.key === "Enter") {
      this.changeItem(e, item, "onBlur");
      e.target.blur();
    }
  }

  render(){
    const item = this.props.item;
    if(item && item !== null && item !== undefined) {
      const key = `item${item.index}`;
      if(this.props.items === "uncompleted"){
        if(item.completed === false) {
          return (
            <Fragment key={item.id}>
              <div className="item-container" index={item.id}>
                <div className="checkmark unchecked" onClick={() => this.props.itemCompleted(key)}>
                  <ToolTip tip="Kész" position="top" />
                </div>
                <div className="item-text" htmlFor={item.index}>
                  <form key={key} onSubmit={(e) => this.changeItem(e, item, "onSubmit")} onBlur={(e) => this.changeItem(e, item, "onBlur")}>
                    <TextAreaAutoSize
                      key={key}
                      defaultValue={item.text}
                      autoComplete="off"
                      className="item"
                      onKeyPress={(e) => this.editItemKeyHandler(e, item)}
                    >
                    </TextAreaAutoSize>
                  </form>
                </div>
                <div className="remove-item" onClick={() => this.props.removeFromActualList(key)}>
                  <ToolTip tip="Törlés" position="left" />
                </div>
              </div>
            </Fragment>
          )
        } else {
          return null;
        }
      } else if(this.props.items === "completed"){
        if(item.completed === true) {
          return (
            <Fragment key={item.id}>
              <div className="item-container" index={item.id}>
                <div className="checkmark checked" onClick={() => this.props.itemCompleted(key)}>
                  <ToolTip tip="Mégse" position="top" />
                </div>
                <div className="item-text" htmlFor={item.index}>
                  <form key={key} onSubmit={(e) => this.changeItem(e, item, "onSubmit")} onBlur={(e) => this.changeItem(e, item, "onBlur")}>
                    <TextAreaAutoSize
                      key={key}
                      defaultValue={item.text}
                      autoComplete="off"
                      className="item"
                      onKeyPress={(e) => this.editItemKeyHandler(e, item)}
                    >
                    </TextAreaAutoSize>
                  </form>
                </div>
                <div className="remove-item" onClick={() => this.props.removeFromActualList(key)}>
                  <ToolTip tip="Törlés" position="left" />
                </div>
              </div>
            </Fragment>
          )
        } else {
          return null;
        }
      } else if(this.props.items === "sortable"){
        if(item.completed === false) {
          return (
            <Fragment key={item.id}>
              <div className="movable-item-container" index={item.id}>
                <div className="item-text" htmlFor={item.index}>
                  <form key={key}>
                    <TextAreaAutoSize
                      key={key}
                      defaultValue={item.text}
                      autoComplete="off"
                      className="item"
                      disabled
                    >
                    </TextAreaAutoSize>
                  </form>
                </div>
              </div>
            </Fragment>
          )
        } else {
          return null;
        }
      }
      return null;
    }
    return null;
  }
}

export default Item;
