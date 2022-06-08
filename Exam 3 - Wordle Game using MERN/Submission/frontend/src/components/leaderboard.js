import React from "react";
import axios from "axios";
import "../index.css";

let userlist = ["shozab", "hussain"]

export default class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        history: ""
    };

    this.onClickBack = this.onClickBack.bind(this);
  }

  onClickBack(e) {
    e.preventDefault();

    window.location = "/homepage"
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <div>LeaderBoard: </div>
        <div>
            <ol>
            {
               userlist.map((elem, index) => (
                   <li >
                    {
                       elem
                    }
                   </li>
               ))
            }
            </ol>
        </div>

        <div><button type="submit" class="btn btn-primary mb-3 mt-3" onClick={this.onClickBack}>Back</button></div>
      </div>
    );
  }
}
