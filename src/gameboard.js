import { Ship } from './ship';
export { Gameboard };

function Gameboard() {
  const carrier = Ship('carrier', 5);
  const battleship = Ship('battleship', 4);
  const cruiser = Ship('cruiser', 3);
  const destroyer1 = Ship('destroyer1', 2);
  const destroyer2 = Ship('destroyer2', 2);
  const submarine1 = Ship('submarine1', 1);
  const submarine2 = Ship('submarine2', 1);
  const ships = [
    carrier,
    battleship,
    cruiser,
    destroyer1,
    destroyer2,
    submarine1,
    submarine2,
  ];
  let board = [[], [], [], [], [], [], [], [], [], []];

  function initializeCells() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board[i][j] = {
          coordinate: [i, j],
          ship: null,
          isHit: false,
          isMiss: false,
        };
      }
    }
  }

  function placeShip(ship) {
    let direction = ['v', 'h'][Math.floor(Math.random() * 2)];
    let max_col = 10;
    let max_row = 10;
    if (direction === 'v') max_row -= ship.getLength() - 1;
    if (direction === 'h') max_col -= ship.getLength() - 1;
    if (max_row < 1 || max_col < 1) return false;
    let corner = [
      Math.floor(Math.random() * max_col),
      Math.floor(Math.random() * max_row),
    ];
    if (ship.canFit(board, direction, corner)) {
      ship.insert(board, direction, corner);
      return true;
    } else {
      return false;
    }
  }

  function placeShips() {
    for (let attempt = 0; attempt < 1000000; attempt++) {
      initializeCells();
      let attemptSuccessful = true;
      for (let i = 0; i < ships.length; i++) {
        if (!placeShip(ships[i])) {
          attemptSuccessful = false;
          break;
        }
      }
      if (attemptSuccessful) {
        console.log(this.board);
        return;
      }
    }
    console.log('failed');
  }

  function receiveAttack(row, column) {
    let plot = this.board[row][column];
    if (plot.ship !== null && plot.isHit === false && plot.isMiss === false) {
      plot.ship.hit();
      plot.isHit = true;
      console.log('hit!', row, column);
      return true;
    } else if (
      plot.ship === null &&
      plot.isHit === false &&
      plot.isMiss === false
    ) {
      plot.isMiss = true;
      console.log('miss!', row, column);
      return true;
    } else if (plot.isHit === true || plot.isMiss === true) {
      console.log('plot has already been hit', row, column);
      return false;
    }
  }

  const isGameOver = () => {
    if (
      carrier.isSunk(board) &&
      battleship.isSunk(board) &&
      cruiser.isSunk(board) &&
      destroyer1.isSunk(board) &&
      destroyer2.isSunk(board) &&
      submarine1.isSunk(board) &&
      submarine2.isSunk(board)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return { board, placeShips, receiveAttack, isGameOver };
}
