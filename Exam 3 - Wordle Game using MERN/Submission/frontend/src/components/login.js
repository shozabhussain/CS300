import React from "react";
import axios from "axios";
import "../index.css";

// code for form taken from here https://getbootstrap.com/docs/5.0/forms/overview/

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: ""
    };

    this.onSubmitLogIn = this.onSubmitLogIn.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitSignUp= this.onSubmitSignUp.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmitLogIn(e) {
    e.preventDefault();

    console.log(`registered:`);
    console.log(`username: ${this.state.username}`);
    console.log(`password: ${this.state.password}`);

    const userCredentials = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post("http://localhost:9000/login", userCredentials)
      .then((res) => {
        if(res.data == "Login successful"){
          localStorage.setItem("username", this.state.username)
          window.location = "/homepage"
        }
        else{
          alert("Please enter correct username/password")
        }
      });
  }

  onSubmitSignUp(e){
    e.preventDefault();

    window.location = "/signup"
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
            <form class="mt-3" onSubmit={this.onSubmitLogIn}>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Username</label>
            <input type="text" class="form-control" id="exampleInputEmail1" value={this.state.username} onChange={this.onChangeUsername}></input>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" value={this.state.password} onChange={this.onChangePassword}></input>
        </div>
        <button type="submit" class="btn btn-primary" >Log In</button>
        </form>

        <div><button type="submit" class="btn btn-primary mb-3 mt-3" onClick={this.onSubmitSignUp}>Sign Up</button></div>
      </div>
    );
  }
}
