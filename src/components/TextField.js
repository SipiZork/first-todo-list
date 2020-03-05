import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class TextField extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    type: "text",
    className: "",
    autoComplete: "on",
    value: "",
    onChange: () => ""
  }

  constructor(props) {
    super(props);

    this.state = {
      type: props.type || "",
      className: props.className || "",
      value: props.value || "",
      autoComplete: props.autoComplete || "on"
    }
  }

  onChange = event => {
    const value = event.target.value;
    this.setState({ value });
    return this.props.onChange(event);
  }

  render() {
    const { type, className, value, autoComplete } = this.state;
    const { name } = this.props;
    return (
      <Fragment>
        <input
          type={type}
          name={name}
          className={className}
          autoComplete={autoComplete}
          value={value}
          onChange={this.onChange}
        />
        <div className="input-text">Lista hozzáadása</div>
      </Fragment>
    )
  }
}

export default TextField;
