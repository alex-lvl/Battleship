import './style.scss';
import { Gameboard } from './gameboard';
import { Player } from './player';
import { Controller } from './dom';
import { Ship } from './ship';

function Game() {
  const controller = Controller();

  function initialize() {
    const startBtn = document.querySelector('.button-start');
    startBtn.addEventListener('click', () => {
      startBtn.style.display = 'none';
      controller.displayUIHeader();
      controller.createUIGameboards();
      startGame();
    });
  }

  function startGame() {
    const gameboards = document.querySelectorAll('.gameboard-grid');
    const player = Player('player');
    const computer = Player('computer');
    const playerUIBoard = [...gameboards[0].children];
    const computerUIBoard = [...gameboards[1].children];
    const playerGameboard = Gameboard(gameboards[0].children);
    const computerGameboard = Gameboard(gameboards[1].children);
    playerGameboard.placeShips();
    computerGameboard.placeShips();
    player.toggleTurn();

    computerUIBoard.forEach((plot) => {
      plot.addEventListener('click', () => {
        let rowIndex = parseInt(plot.dataset.x);
        let colIndex = parseInt(plot.dataset.y);
        if (player.turn && !isGameOver(playerGameboard, computerGameboard)) {
          if (
            computerGameboard.board[rowIndex][colIndex].isMiss === false &&
            computerGameboard.board[rowIndex][colIndex].isHit === false
          ) {
            player.attack(computerGameboard, rowIndex, colIndex);
            if (computerGameboard.board[rowIndex][colIndex].isHit) {
              controller.showHitMarker(plot);
            } else if (computerGameboard.board[rowIndex][colIndex].isMiss) {
              controller.showMissMarker(plot);
            }

            computerPlay(computer, playerGameboard, playerUIBoard);
            player.toggleTurn();
          } else {
            console.log('try again!');
          }
        }
      });
    });
  }

  function computerPlay(computer, enemyBoard, enemyUIBoard) {
    computer.toggleTurn();
    let coordinates = computer.attack(enemyBoard);
    if (enemyBoard.board[coordinates[0]][coordinates[1]].isHit) {
      controller.showHitMarker(enemyUIBoard[parseInt(coordinates.join(''))]);
    } else if (enemyBoard.board[coordinates[0]][coordinates[1]].isMiss) {
      controller.showMissMarker(enemyUIBoard[parseInt(coordinates.join(''))]);
    }
  }

  function isGameOver(playersBoard, computersBoard) {
    if (playersBoard.isGameOver()) {
      return true;
    } else if (computersBoard.isGameOver()) {
      return true;
    } else {
      return false;
    }
  }

  return { initialize };
}

Game().initialize();
