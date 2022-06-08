import React from "react";
import axios from "axios";
import "../index.css";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: ""
    };

    this.onSubmitSignUp = this.onSubmitSignUp.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
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

  onSubmitSignUp(e) {
    e.preventDefault();

    console.log(`registered:`);
    console.log(`username: ${this.state.username}`);
    console.log(`password: ${this.state.password}`);

    const userCredentials = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post("http://localhost:9000/register", userCredentials)
      .then((res) => {
        if(res.data == "sign up successful"){
          window.location = "/"
        }
        else{
          alert("User already registerd")
        }
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
            <form class="mt-3" onSubmit={this.onSubmitSignUp}>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Username</label>
            <input type="text" class="form-control" id="exampleInputEmail1" value={this.state.username} onChange={this.onChangeUsername}></input>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" value={this.state.password} onChange={this.onChangePassword}></input>
        </div>
        <button type="submit" class="btn btn-primary mb-3 mt-3">Sign Up</button>
        </form>
      </div>
    );
  }
}
