const fs = require(`fs`);
const http = require(`http`);
const WebSocket = require(`ws`); // npm i ws

const board = [
  [
    "card back",
    "card rank-2 spades",
    "card rank-3 spades",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-10 diams",
    "card rank-q diams",
    "card rank-k diams",
    "card rank-a diams",
    "card back",
  ],

  [
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-3 clubs",
    "card rank-2 clubs",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-6 spades",
    "card rank-7 spades",
    "card rank-a clubs",
  ],

  [
    "card rank-7 clubs",
    "card rank-a spades",
    "card rank-2 diams",
    "card rank-3 diams",
    "card rank-4 diams",
    "card rank-k clubs",
    "card rank-q clubs",
    "card rank-10 clubs",
    "card rank-8 spades",
    "card rank-k clubs",
  ],

  [
    "card rank-8 clubs",
    "card rank-k spades",
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-9 hearts",
    "card rank-8 hearts",
    "card rank-9 clubs",
    "card rank-9 spades",
    "card rank-6 spades",
  ],

  [
    "card rank-9 clubs",
    "card rank-q spades",
    "card rank-7 clubs",
    "card rank-6 hearts",
    "card rank-5 hearts",
    "card rank-2 hearts",
    "card rank-7 hearts",
    "card rank-8 clubs",
    "card rank-10 spades",
    "card rank-10 clubs",
  ],

  [
    "card rank-a spades",
    "card rank-7 hearts",
    "card rank-9 diams",
    "card rank-a hearts",
    "card rank-4 hearts",
    "card rank-3 hearts",
    "card rank-k hearts",
    "card rank-10 diams",
    "card rank-6 hearts",
    "card rank-2 diams",
  ],

  [
    "card rank-k spades",
    "card rank-8 hearts",
    "card rank-8 diams",
    "card rank-2 clubs",
    "card rank-3 clubs",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-q diams",
    "card rank-5 hearts",
    "card rank-3 diams",
  ],

  [
    "card rank-q spades",
    "card rank-9 hearts",
    "card rank-7 diams",
    "card rank-6 diams",
    "card rank-5 diams",
    "card rank-a clubs",
    "card rank-a diams",
    "card rank-k diams",
    "card rank-4 hearts",
    "card rank-4 diams",
  ],

  [
    "card rank-10 spades",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-k hearts",
    "card rank-a hearts",
    "card rank-3 spades",
    "card rank-2 spades",
    "card rank-2 hearts",
    "card rank-3 hearts",
    "card rank-5 diams",
  ],

  [
    "card back",
    "card rank-9 spades",
    "card rank-8 spades",
    "card rank-7 spades",
    "card rank-6 spades",
    "card rank-9 diams",
    "card rank-8 diams",
    "card rank-7 diams",
    "card rank-6 diams",
    "card back",
  ],
];

const positionBoard = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

const deck = [
  "card rank-a spades",
  "card rank-2 spades",
  "card rank-3 spades",
  "card rank-4 spades",
  "card rank-5 spades",
  "card rank-6 spades",
  "card rank-7 spades",
  "card rank-8 spades",
  "card rank-9 spades",
  "card rank-10 spades",
  "card rank-j spades",
  "card rank-q spades",
  "card rank-k spades",
  "card rank-a clubs",
  "card rank-2 clubs",
  "card rank-3 clubs",
  "card rank-4 clubs",
  "card rank-5 clubs",
  "card rank-6 clubs",
  "card rank-7 clubs",
  "card rank-8 clubs",
  "card rank-9 clubs",
  "card rank-10 clubs",
  "card rank-j clubs",
  "card rank-q clubs",
  "card rank-k clubs",
  "card rank-a diams",
  "card rank-2 diams",
  "card rank-3 diams",
  "card rank-4 diams",
  "card rank-5 diams",
  "card rank-6 diams",
  "card rank-7 diams",
  "card rank-8 diams",
  "card rank-9 diams",
  "card rank-10 diams",
  "card rank-j diams",
  "card rank-q diams",
  "card rank-k diams",
  "card rank-a hearts",
  "card rank-2 hearts",
  "card rank-3 hearts",
  "card rank-4 hearts",
  "card rank-5 hearts",
  "card rank-6 hearts",
  "card rank-7 hearts",
  "card rank-8 hearts",
  "card rank-9 hearts",
  "card rank-10 hearts",
  "card rank-j hearts",
  "card rank-q hearts",
  "card rank-k hearts",
];

const divideDeckIntoPieces = (deck) => {
  let shuffled = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  const result = new Array(Math.ceil(shuffled.length / 6))
    .fill()
    .map((_) => shuffled.splice(0, 6));
  //console.log(result);
  return result;
};

// code to read file
const readFile = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, `utf-8`, (readErr, fileContents) => {
      if (readErr) {
        reject(readErr);
      } else {
        resolve(fileContents);
      }
    });
  });

// code to create a server
const server = http.createServer(async (req, resp) => {
  console.log(`browser asked for ${req.url}`);
  if (req.url == `/mydoc`) {
    const clientHtml = await readFile(`client.html`);
    resp.end(clientHtml);
  } else if (req.url == `/myjs`) {
    const clientJs = await readFile(`client.js`);
    resp.end(clientJs);
  } else if (req.url == `/sequence.css`) {
    const sequenceCss = await readFile(`sequence.css`);
    resp.end(sequenceCss);
  } else {
    resp.end(`not found`);
  }
});

const checkWin = (positionBoard) => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (positionBoard[i][j] == "-") {
        continue;
      } else {
        if (
          positionBoard[i][j] == positionBoard[i][j + 1] &&
          positionBoard[i][j + 1] == positionBoard[i][j + 2] &&
          positionBoard[i][j + 2] == positionBoard[i][j + 3] &&
          positionBoard[i][j + 3] == positionBoard[i][j + 4]
        ) {
          return positionBoard[i][j];
        }
        if (
          positionBoard[i][j] == positionBoard[i + 1][j] &&
          positionBoard[i + 1][j] == positionBoard[i + 2][j] &&
          positionBoard[i + 2][j] == positionBoard[i + 3][j] &&
          positionBoard[i + 3][j] == positionBoard[i + 4][j]
        ) {
          return positionBoard[i][j];
        }
        if (
          positionBoard[i][j] == positionBoard[i + 1][j + 1] &&
          positionBoard[i + 1][j + 1] == positionBoard[i + 2][j + 2] &&
          positionBoard[i + 2][j + 2] == positionBoard[i + 3][j + 3] &&
          positionBoard[i + 3][j + 3] == positionBoard[i + 4][j + 4]
        ) {
          return positionBoard[i][j];
        }
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    for (let j = 9; j > 3; j--) {
      if (positionBoard[i][j] == "-") {
        continue;
      } else {
        if (
          positionBoard[i][j] == positionBoard[i][j - 1] &&
          positionBoard[i][j - 1] == positionBoard[i][j - 2] &&
          positionBoard[i][j - 2] == positionBoard[i][j - 3] &&
          positionBoard[i][j - 3] == positionBoard[i][j - 4]
        ) {
          return positionBoard[i][j];
        }
        if (
          positionBoard[i][j] == positionBoard[i + 1][j] &&
          positionBoard[i + 1][j] == positionBoard[i + 2][j] &&
          positionBoard[i + 2][j] == positionBoard[i + 3][j] &&
          positionBoard[i + 3][j] == positionBoard[i + 4][j]
        ) {
          return positionBoard[i][j];
        }
        if (
          positionBoard[i][j] == positionBoard[i + 1][j - 1] &&
          positionBoard[i + 1][j - 1] == positionBoard[i + 2][j - 2] &&
          positionBoard[i + 2][j - 2] == positionBoard[i + 3][j - 3] &&
          positionBoard[i + 3][j - 3] == positionBoard[i + 4][j - 4]
        ) {
          return positionBoard[i][j];
        }
      }
    }
  }

  for (let i = 6; i < 10; i++) {
    for (let j = 0; j < 6; j++) {
      if (positionBoard[i][j] == "-") {
        continue;
      } else {
        if (
          positionBoard[i][j] == positionBoard[i][j + 1] &&
          positionBoard[i][j + 1] == positionBoard[i][j + 2] &&
          positionBoard[i][j + 2] == positionBoard[i][j + 3] &&
          positionBoard[i][j + 3] == positionBoard[i][j + 4]
        ) {
          return positionBoard[i][j];
        }
      }
    }
  }

  return "not found";
};

// to listen for clients
server.listen(8000);

// creating a web socket
const wss = new WebSocket.Server({ port: 8080 });

playersList = {};
numOfPlayers = 1;
currentTurn = 1;
newDeck = "";
totalturns = 0;

wss.on(`connection`, (ws) => {
  console.log(`player ${numOfPlayers} connected `);

  playersList[numOfPlayers] = ws;
  numOfPlayers++;

  if (numOfPlayers == 5) {
    newDeck = divideDeckIntoPieces(deck);

    for (let i = 0; i < 4; i++) {
      if (i == 0 || i == 2) {
        temp = "color blue";
      } else {
        temp = "color green";
      }

      msgToSend = {
        type: `newboard`,
        board: board,
        positionBoard: positionBoard,
        deck: newDeck[i],
        color: temp,
        turn: currentTurn,
        id: i + 1,
      };
      playersList[i + 1].send(JSON.stringify(msgToSend));
    }
  }

  ws.on(`message`, (message) => {
    const rcvClient = JSON.parse(message);

    if (rcvClient.type == "sendCards") {
      if (totalturns > 25) {
        msgToSend = {
          type: "moreCards",
          deck: [],
        };
      } else {
        msgToSend = {
          type: "moreCards",
          deck: newDeck[rcvClient.id + 3],
        };
      }

      ws.send(JSON.stringify(msgToSend));
    }

    if (rcvClient.type == "changePositionBoard") {
      if (playersList[1] == ws || playersList[3] == ws) {
        positionBoard[rcvClient.row][rcvClient.column] = "b";
      } else {
        positionBoard[rcvClient.row][rcvClient.column] = "g";
      }

      totalturns++;
      currentTurn++;
      if (currentTurn == 5) {
        currentTurn = 1;
      }

      msgToSend = {
        type: "changePositionBoard",
        positionBoard: positionBoard,
        turn: currentTurn,
      };

      for (let i = 0; i < 4; i++) {
        playersList[i + 1].send(JSON.stringify(msgToSend));
      }

      const result = checkWin(positionBoard);
      if (result != "not found") {
        let winner = "";

        if (result.includes("b")) {
          winner = "player 1 and player 3 wins";
        } else {
          winner = "player 2 and player 4 wins";
        }

        msgToSend = {
          type: "end",
          winner: winner,
        };

        for (let i = 0; i < 4; i++) {
          playersList[i + 1].send(JSON.stringify(msgToSend));
        }
      }

      if (totalturns == 48) {
        msgToSend = {
          type: "end",
          winner: "game draw",
        };

        for (let i = 0; i < 4; i++) {
          playersList[i + 1].send(JSON.stringify(msgToSend));
        }
      }
    }
  });
});
