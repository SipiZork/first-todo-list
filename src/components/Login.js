import React, { Component, Fragment } from 'react';
import { auth } from '../base';
import PopUp from './PopUp';
import '../css/Login.css';

class Login extends Component {

  state = {
    register: false,
    showPopup: false,
    user: "",
    popup: {
      title: "",
      msg: ""
    },
    emailRemember: false
  }

  componentDidMount(){
    if(this.props.match.path === "/register") {
      this.setState({ register: true });
    } else if(this.props.match.path === "/login") {
      this.setState({ register: false });
    } else {
      this.props.moveUrlTo("/login");
    }
  }


  componentDidUpdate(prevProps) {
    if(prevProps.match.path !== this.props.match.path) {
      if(this.props.match.path === "/register") {
        this.setState({ register: true });
      } else if(this.props.match.path === "/login") {
        this.setState({ register: false });
      }
    }
    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        const user = firebaseUser;
        localStorage.setItem("user", JSON.stringify(user));
        this.props.login(user);
      } else {

      }
    });
  }

  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
  }

  createUser = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const passAgain = e.target.passwordAgain.value;
    if(pass !== passAgain) {
      this.renderError("Regisztrációs hiba", "A két jelszó nem egyezik meg");
    } else {
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise
        .then(user => "")
        .catch((e) => this.renderError("Regisztrációs hiba", e.message));
    }
  }

  setLocalStorage = email => {
    localStorage.setItem("emailRemember", email);
  }

  logInUser = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise
      .then(user => this.setLocalStorage(email))
      .catch((e) => this.renderError("Bejelentkezési hiba", e.message));
  }

  register = e => {
    e.preventDefault();
    console.log("hmmmm?");
    this.setState({ register: true });
    this.props.moveUrlTo("/register");
  }

  msgConverter = msg => {
    if(msg === "The email address is badly formatted.") {
      return "Nem megfelelő email formátum";
    } else if(msg === "The password is invalid or the user does not have a password.") {
      return "A Jelszó helytelen vagy a felhaszálnó nem rendelkezik jelszóval";
    } else if(msg === "There is no user record corresponding to this identifier. The user may have been deleted.") {
      return "A felhasználó nem létezik.";
    } else if(msg === "The password must be 6 characters long or more."){
      return "A Jelszónak legalább 6 karakter hosszúnak kell lennie."
    } else if(msg === "Password should be at least 6 characters"){
      return "A Jelszónak legalább 6 karakter hosszúnak kell lennie."
    } else {
      return msg;
    }
  }

  renderError = (title, msg) => {
    const popup = { ...this.state.popup };
    popup.title = title;
    popup.msg = this.msgConverter(msg);
    this.setState({ popup });
    this.togglePopup();
  }
  renderLogIn = () => {
    const { showPopup } = this.state;
    const { title,msg } = this.state.popup;
    const email = localStorage.getItem("emailRemember");
    return(
      <Fragment>
        {showPopup === true ? <PopUp title={title} msg={msg} togglePopup={this.togglePopup}/> : "" }
        <div className="login">
          <h2>Belépés</h2>
          <form onSubmit={(e) => this.logInUser(e)}>
            <input type="text" name="email" defaultValue={email && email !== null ? email : ""} autoComplete="off" placeholder="Email" className="name"/>
            <input type="password" name="password" autoComplete="off" placeholder="Jelszó" className="password"/>
            <div className="button-wrapper">
              <button type="submit">Belépés</button>
              <button type="button" onClick={(e) => this.register(e)}>Regisztráció</button>
            </div>
          </form>
        </div>
      </Fragment>
    )
  }

  renderRegister = () => {
    const { showPopup } = this.state;
    const { title,msg } = this.state.popup;
    return(
      <Fragment>
        {showPopup === true ? <PopUp title={title} msg={msg} togglePopup={this.togglePopup}/> : "" }
        <div className="register">
          <h2>Regisztráció</h2>
          <form onSubmit={(e) => this.createUser(e)}>
            <input type="text" name="email" placeholder="Email" className="name"/>
            <input type="password" name="password" placeholder="Jelszó" className="password"/>
            <input type="password" name="passwordAgain" placeholder="Jelszó ismét" className="password"/>
            <button type="submit" >Regisztráció</button>
          </form>
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <Fragment>
        {this.state.register === false ? this.renderLogIn() : this.renderRegister()}

      </Fragment>
    )
  }
}

export default Login;
