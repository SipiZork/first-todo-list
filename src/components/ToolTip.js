import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import '../css/ToolTip.css';


  let divStyle = {
    left: "50px"
  };

  let prucsokStyle = {

  };

class ToolTip extends Component {

  state = {
    show: false,
    position: "",
    classes: "tooltip hide"
  }

  position = () => {
    const { position } = this.state;
    if(position === "left") {
      const tooltipWidth = ReactDOM.findDOMNode(this).clientWidth;
      divStyle = {
        left: -tooltipWidth-10
      }
      prucsokStyle = {
        top: ".45rem",
        right: "-.25rem"
      }
    } else if(position === "right") {
      const parentWidth = ReactDOM.findDOMNode(this).parentNode.clientWidth;
      divStyle = {
        left: parentWidth+10
      }
      prucsokStyle = {
        top: ".45rem",
        left: "-.25rem"
      }
    } else if(position === "top") {
        const tooltipHeight= ReactDOM.findDOMNode(this).clientHeight;
        const tooltipWidth = ReactDOM.findDOMNode(this).clientWidth;
        const parentWidth = ReactDOM.findDOMNode(this).parentNode.clientWidth;
        divStyle = {
          top: -tooltipHeight-10 ,
          left: (parentWidth / 2) - (tooltipWidth / 2),
        }
        prucsokStyle = {
          bottom: "-.25rem",
          left: (tooltipWidth / 2) - 5
        }
    } else if(position === "bottom") {
        const tooltipHeight= ReactDOM.findDOMNode(this).clientHeight;
        const tooltipWidth = ReactDOM.findDOMNode(this).clientWidth;
        const parentWidth = ReactDOM.findDOMNode(this).parentNode.clientWidth;
        divStyle = {
          top: tooltipHeight+10,
          left: (parentWidth / 2) - (tooltipWidth / 2),
        }
        prucsokStyle = {
          top: "-.25rem",
          left: (tooltipWidth / 2) - 5
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
    this.position();
  }

  render() {
    return (
      <Fragment>
        <div className={this.state.classes} style={divStyle}>{this.props.tip}
          <div className="prucsok" style={prucsokStyle}></div>
        </div>
      </Fragment>
    )
  }
}

export default ToolTip;
