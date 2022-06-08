const ws = new WebSocket(`ws://localhost:8080`);

const Sequence = () => {
  const [board, setBoard] = React.useState([[]]);
  const [positionBoard, setPositionBoard] = React.useState([[]]);
  const [cards, setCards] = React.useState([]);
  const [deck, setDeck] = React.useState([]);
  const [msgFromServer, setMsgFromServer] = React.useState(
    "Game not started yet"
  );
  const [color, setColor] = React.useState("");
  const [myId, setMyId] = React.useState(0);
  const [currentTurn, setCurrentTurn] = React.useState(0);

  let diamondSign = "♦";
  let heartSign = "♥";
  let spadesSign = "♠";
  let clubsSign = "♣";

  ws.onmessage = (event) => {
    const rcvServer = JSON.parse(event.data);

    if (rcvServer.type == "newboard") {
      setBoard(rcvServer.board);
      setPositionBoard(rcvServer.positionBoard);
      setDeck(rcvServer.deck);
      setColor(rcvServer.color);
      setMyId(rcvServer.id);
      setCurrentTurn(rcvServer.turn);
      setMsgFromServer(`player ${rcvServer.turn}'s turn`);
    } else if (rcvServer.type == "changePositionBoard") {
      setPositionBoard(rcvServer.positionBoard);
      setCurrentTurn(rcvServer.turn);
      setMsgFromServer(`player ${rcvServer.turn}'s turn`);

      if (deck.length == 0) {
        const msgToSend = {
          type: "sendCards",
          id: myId,
        };
        ws.send(JSON.stringify(msgToSend));
      }
    } else if (rcvServer.type == "end") {
      setMsgFromServer(rcvServer.winner);
      ws.close();
    } else if (rcvServer.type == "moreCards") {
      setDeck(rcvServer.deck);
    }
  };

  const onClickHandler = (elem, row, col) => {
    if (currentTurn != myId) {
      setMsgFromServer("Please wait for your turn");
      return;
    }

    if (deck.includes(elem) == false) {
      const cardClicked = board[col][row];
      if (
        deck.includes("card rank-j spades") ||
        deck.includes("card rank-j clubs") ||
        deck.includes("card rank-j diams") ||
        deck.includes("card rank-j hearts")
      ) {
        const tempDeck = deck.slice();

        let jackToRemove = "";
        for (let i = 0; i < deck.length; i++) {
          if (deck[i].includes("rank-j")) {
            jackToRemove = deck[i];
            break;
          }
        }

        const filteredDeck = tempDeck.filter(function (value, index, arr) {
          return !value.includes(jackToRemove);
        });

        const msgToSend = {
          type: "changePositionBoard",
          row: row,
          column: col,
        };

        ws.send(JSON.stringify(msgToSend));
        setDeck(filteredDeck);
        return;
      } else {
        setMsgFromServer("Please choose a correct move");
        return;
      }
    }

    if (deck.includes(elem)) {
      setMsgFromServer("");
      const tempDeck = deck.slice();
      const filteredDeck = tempDeck.filter(function (value, index, arr) {
        return value != elem;
      });

      const msgToSend = {
        type: "changePositionBoard",
        row: row,
        column: col,
      };

      ws.send(JSON.stringify(msgToSend));
      setDeck(filteredDeck);
    }
  };

  const deckMaker = (elem) => {
    if (elem.includes("back")) {
      return (
        <a class={elem}>
          <span class="rank"></span>
        </a>
      );
    } else if (elem.includes("spades")) {
      return (
        <a class={elem}>
          <span class="rank">{elem.split("-")[1].slice(0, 2)}</span>
          <span class="suit">{spadesSign}</span>
        </a>
      );
    } else if (elem.includes("diams")) {
      return (
        <a class={elem}>
          <span class="rank">{elem.split("-")[1].slice(0, 2)}</span>
          <span class="suit">{diamondSign}</span>
        </a>
      );
    } else if (elem.includes("clubs")) {
      return (
        <a class={elem}>
          <span class="rank">{elem.split("-")[1].slice(0, 2)}</span>
          <span class="suit">{clubsSign}</span>
        </a>
      );
    } else if (elem.includes("hearts")) {
      return (
        <a class={elem}>
          <span class="rank">{elem.split("-")[1].slice(0, 2)}</span>
          <span class="suit">{heartSign}</span>
        </a>
      );
    }
  };

  const cardMaker = (elem, row, col) => {
    const tempPositionBoard = positionBoard.slice();
    try {
      if (tempPositionBoard[row][col] == "g") {
        return (
          <div className="card">
            <div className="green"></div>
          </div>
        );
      } else if (tempPositionBoard[row][col] == "b") {
        return (
          <div className="card">
            <div className="blue"></div>
          </div>
        );
      }
    } catch (error) {}

    if (elem.includes("back")) {
      return (
        <div class={elem}>
          <span class="rank"></span>
        </div>
      );
    } else if (elem.includes("spades")) {
      return (
        <div
          class={elem}
          onClick={() => {
            onClickHandler(elem, row, col);
          }}
        >
          <span class="rank">{elem.split("-")[1].slice(0, 2)}</span>
          <span class="suit">{spadesSign}</span>
        </div>
      );
    } else if (elem.includes("diams")) {
      return (
        <div
          class={elem}
          onClick={() => {
            onClickHandler(elem, row, col);
          }}
        >
          <span class="rank">{elem.split("-")[1].slice(0, 2)}</span>
          <span class="suit">{diamondSign}</span>
        </div>
      );
    } else if (elem.includes("clubs")) {
      return (
        <div
          class={elem}
          onClick={() => {
            onClickHandler(elem, row, col);
          }}
        >
          <span class="rank">{elem.split("-")[1].slice(0, 2)}</span>
          <span class="suit">{clubsSign}</span>
        </div>
      );
    } else if (elem.includes("hearts")) {
      return (
        <div
          class={elem}
          onClick={() => {
            onClickHandler(elem, row, col);
          }}
        >
          <span class="rank">{elem.split("-")[1].slice(0, 2)}</span>
          <span class="suit">{heartSign}</span>
        </div>
      );
    }
  };

  return (
    <div>
      <div class="container">
        {board.map((column, index) => (
          <div>
            {
              <div class="playingCards fourColours rotateHand">
                {
                  <ul class="table">
                    {column.map((elem, ind) => (
                      <div>{<li>{cardMaker(elem, ind, index)}</li>}</div>
                    ))}
                  </ul>
                }
              </div>
            }
          </div>
        ))}
      </div>

      <div class="container">
        <div>
          <h1>Your Cards:</h1>
        </div>
        {
          <div class="playingCards fourColours rotateHand">
            {
              <ul class="table">
                {deck.map((elem, ind) => (
                  <li>{deckMaker(elem)}</li>
                ))}
              </ul>
            }
          </div>
        }
        {<div class="text_box">{msgFromServer} </div>}
        {<div class={color}></div>}
      </div>
    </div>
  );
};

ReactDOM.render(<Sequence />, document.querySelector(`#root`));
