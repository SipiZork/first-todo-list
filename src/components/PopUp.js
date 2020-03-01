import React, { Component, Fragment } from "react";
import "../css/PopUp.css";

class PopUp extends Component {
  render() {
    return(
      <Fragment>
        <div className="popup">
          <div className="popup-inner">
            <h1>{this.props.title}</h1>
            <p>{this.props.msg}</p>
            <button onClick={this.props.togglePopup}>Bezárás</button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default PopUp;
