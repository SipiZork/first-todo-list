import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import '../css/ToolTip.css';


  let divStyle = {
    left: "50px",
  };

  let shaftStyle = {

  };

class ToolTip extends Component {

  state = {
    show: false,
    position: "top",
    classes: "tooltip hide",
    color: "white",
    bgColor: "black"
  }

  position = () => {
    const tooltipWidth = ReactDOM.findDOMNode(this).clientWidth;
    const tooltipHeight= ReactDOM.findDOMNode(this).clientHeight;
    const parentWidth = ReactDOM.findDOMNode(this).parentNode.clientWidth;
    const propsColor = this.props.color;
    const propsBgColor = this.props.bgColor;
    const color = propsColor && propsColor !== null ? propsColor : this.state.color;
    const bgColor = propsBgColor && propsBgColor !== null ? propsBgColor : this.state.bgColor;
    const { position } = this.state;
    if(position === "left") {
      divStyle = {
        left: -tooltipWidth-10,
        color: color,
        backgroundColor: bgColor
      }
      shaftStyle = {
        top: ".45rem",
        right: "-.25rem",
        color: color,
        backgroundColor: bgColor
      }
    } else if(position === "right") {
      divStyle = {
        left: parentWidth+10,
        color: color,
        backgroundColor: bgColor
      }
      shaftStyle = {
        top: ".45rem",
        left: "-.25rem",
        color: color,
        backgroundColor: bgColor
      }
    } else if(position === "top") {
        divStyle = {
          top: -tooltipHeight-10 ,
          left: (parentWidth / 2) - (tooltipWidth / 2),
          color: color,
          backgroundColor: bgColor
        }
        shaftStyle = {
          bottom: "-.25rem",
          left: (tooltipWidth / 2) - 5,
          color: color,
          backgroundColor: bgColor
        }
    } else if(position === "bottom") {
        divStyle = {
          top: tooltipHeight+10,
          left: (parentWidth / 2) - (tooltipWidth / 2),
          color: color,
          backgroundColor: bgColor
        }
        shaftStyle = {
          top: "-.25rem",
          left: (tooltipWidth / 2) - 5,
          color: color,
          backgroundColor: bgColor
        }
    }
  }

  show = () => {
    this.setState({ show: !this.state.show }, () => {
      if(this.state.show === true) {
        this.setState({ classes: `tooltip ${this.state.position} show`});
      } else {
        this.setState({ classes: `tooltip ${this.state.position} hide`});
      }
      this.position();
    });

  }

  componentDidMount() {
    this.setState({ position: this.props.position }, () => {
      if(this.state.show === true) {
        this.setState({ classes: `tooltip ${this.state.position} show`});
      } else {
        this.setState({ classes: `tooltip ${this.state.position} hide`});
      }
    });
    ReactDOM.findDOMNode(this).parentNode.addEventListener("mouseenter", this.show);
    ReactDOM.findDOMNode(this).parentNode.addEventListener("mouseleave", this.show);
    window.addEventListener("resize", () => this.setState({ position: this.props.position }));
  }

  render() {
    return (
      <Fragment>
        <div className={this.state.classes} style={divStyle}>{this.props.tip}
          <div className="shaft" style={shaftStyle}></div>
        </div>
      </Fragment>
    )
  }
}

export default ToolTip;