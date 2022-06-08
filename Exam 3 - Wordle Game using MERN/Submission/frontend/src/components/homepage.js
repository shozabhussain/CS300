import React from "react";
import axios from "axios";
import "../index.css";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:""
    };

    this.onClickLogOut= this.onClickLogOut.bind(this);
    this.onClickLeaderBoard = this.onClickLeaderBoard.bind(this);
    this.onClickGame = this.onClickGame.bind(this);
    this.onClickHistory = this.onClickHistory.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: localStorage.getItem("username")
    })
  }

  onClickLogOut(e) {
    e.preventDefault();

    window.location = "/"
  }

  onClickLeaderBoard(e) {
    e.preventDefault();

    window.location = "/leaderboard"
  }

  onClickGame(e) {
    e.preventDefault();

    window.location = "/game"
  }

  onClickHistory(e) {
    e.preventDefault();

    window.location = "/history"
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <div> Hello: {this.state.username} </div>
          <ul>
          <li><button type="submit" class="btn btn-primary mb-3 mt-3" onClick={this.onClickLogOut}>Log Out</button></li>
          <li><button type="submit" class="btn btn-primary mb-3 mt-3" onClick={this.onClickLeaderBoard}>LeaderBoard</button></li>
          <li><button type="submit" class="btn btn-primary mb-3 mt-3"onClick={this.onClickGame}>Game</button></li>
          <li><button type="submit" class="btn btn-primary mb-3 mt-3" onClick={this.onClickHistory}>History</button></li>
          </ul>
      </div>
    );
  }
}
