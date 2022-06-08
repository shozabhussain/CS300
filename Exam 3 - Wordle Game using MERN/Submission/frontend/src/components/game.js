import React from "react";
import axios from "axios";
import "../index.css";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        guessword: "",
        message: "Game in Progess",
        actualword:"",
        wordsList: ["", "", "", "" , "", ""],
        tries: 0,
        result : ""
    }

    axios.get("https://random-word-api.herokuapp.com/word?length=5").then(response => {
        this.setState({
            actualword: response.data.toString()
        })
    })

    this.onChangeWord = this.onChangeWord.bind(this);
    this.onSubmitWord = this.onSubmitWord.bind(this);
    this.onClickPlayAgain = this.onClickPlayAgain.bind(this);
    this.renderWord = this.renderWord.bind(this);
    this.renderLetter = this.renderLetter.bind(this);
  }

  onChangeWord(e) {
    e.preventDefault();
    this.setState({
        guessword: e.target.value
      })
    }
    
    onClickBack(e) {
        e.preventDefault();

        window.location = "/homepage"
      }

    onSubmitWord(e) {
        e.preventDefault();

        if(this.state.message == "You won")
        {
            return
        }

        if(this.state.tries == 6){
            this.setState({
                guessword: "",
                message: `You lost actual word was ${this.state.actualword}`,
            })
            return
        }

        if(this.state.guessword.length != 5){

            this.setState({
                message: "Word length should be 5",
                guessword: ""
            })

            return
        }

        if(this.state.guessword == this.state.actualword){
            this.state.wordsList[this.state.tries] = this.state.guessword
            this.setState({
                message: "You won",
                guessword: "",
                wordsList: this.state.wordsList
            })

            return
        }
        else{

            this.state.wordsList[this.state.tries] = this.state.guessword

            this.setState({
                guessword: "",
                message: "Game in progress",
                wordsList: this.state.wordsList ,
                tries: (this.state.tries + 1)
            })
        }

        if(this.state.tries == 5){
            this.setState({
                guessword: "",
                message: `You lost actual word was ${this.state.actualword}`,
            })
            return
        }
    }

    onClickPlayAgain(e) {
        e.preventDefault();

        axios.get("https://random-word-api.herokuapp.com/word?length=5").then(response => {
            this.setState({
                actualword: response.data.toString()
            })
        })

        this.setState({
            guessword: "",
            message: "Game in Progess",
            wordsList: ["", "", "", "" , "", ""],
            tries: 0,
            result : ""
        })
    }

    renderLetter(letter, index){
        if(this.state.actualword[index] == letter)
        {
            return (<div class="letter-box-green">{letter}</div>)
        }
        else if(this.state.actualword.includes(letter)) {
            return (<div class="letter-box-yellow">{letter}</div>)
        }
        else{
            return (<div class="letter-box-gray">{letter}</div>)
        }
    }


    renderWord(word) {
        if(word == ""){
            return(
                <div class="letter-row">
                <div class="letter-box"></div>
                <div class="letter-box"></div>
                <div class="letter-box"></div>
                <div class="letter-box"></div>
                <div class="letter-box"></div>
              </div>
            )
        }

        word = word.split("") ;
        return(
        <div class="letter-row">
            {
            word.map((letter, index) => (
                this.renderLetter(letter, index)
            ))
            }
        </div>
        )
    }

  render() {
    return (
      <div style={{ marginTop: 10 }}>

    <div class="game-board">
        {
            this.state.wordsList.map((elem, index) => (
                this.renderWord(elem)
            ))
        }
    </div>

    <form class="mt-3" onSubmit={this.onSubmitWord}>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Input Word</label>
            <input type="text" class="form-control" id="exampleInputEmail1" value={this.state.guessword} onChange={this.onChangeWord}></input>
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button>
    </form>

        <div className="mt-3">
            Message: {this.state.message}
        </div>

        <div>
        <button type="submit" class="btn btn-primary mt-3" onClick={this.onClickPlayAgain}>Play Again</button>

        </div>
        <div><button type="submit" class="btn btn-primary mb-3 mt-3" onClick={this.onClickBack}>Back</button></div>
      </div>
    );
  }
}
