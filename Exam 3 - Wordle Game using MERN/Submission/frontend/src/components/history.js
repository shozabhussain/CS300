import React from "react";
import axios from "axios";
import "../index.css";

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        history: ""
    };

    this.onClickBack = this.onClickBack.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: localStorage.getItem("username")
    })
  }


  onClickBack(e) {
    e.preventDefault();

    window.location = "/homepage"
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <div>Username: {this.state.username}</div>
        <div>
            <ul>
                <li>
                    Word:
                </li>
                <li>
                    Result:
                </li>
                <li>
                    Board:
                </li>
            </ul>
        </div>

        <div><button type="submit" class="btn btn-primary mb-3 mt-3" onClick={this.onClickBack}>Back</button></div>
      </div>
    );
  }
}
