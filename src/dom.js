export { Controller };

function Controller() {
  const gameboards = document.querySelectorAll('.gameboard-grid');
  const playerUIBoard = [...gameboards[0].children];

  function createUIGameboards() {
    const gameboard = document.querySelectorAll('.gameboard-grid');
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const plot1 = document.createElement('div');
        const plot2 = document.createElement('div');
        plot2.classList.add('gameboard-grid-item', 'droppable');
        plot1.classList.add('gameboard-grid-item', 'droppable');
        plot1.dataset.x = i;
        plot1.dataset.y = j;
        plot2.dataset.x = i;
        plot2.dataset.y = j;
        gameboard[0].appendChild(plot1);
        gameboard[1].appendChild(plot2);
      }
    }
  }

  function displayUIHeader() {
    const resetBtn = document.querySelector('.button-reset');
    const gameboardsContainer = document.querySelector('.gameboards-container');
    resetBtn.style.display = 'inline-block';
    gameboardsContainer.style.opacity = 1;
  }

  function displayShips(coordinate) {
    playerUIBoard[parseInt(coordinate.join(''))].style.background = 'rgb(208, 208, 251)';
  }

  function showHitMarker(element) {
    element.style.background = 'rgb(254, 187, 187)';
  }

  function showMissMarker(element) {
    element.style.background = 'rgb(210, 210, 210)';
  }

  function resetUIBoard() {
    const playerUIBoard = [...gameboards[0].children];
    const computerUIBoard = [...gameboards[1].children];
    playerUIBoard.forEach((e) => {
      e.style.background = 'white';
    });
    computerUIBoard.forEach((e) => {
      e.style.background = 'white';
    });
  }
  
  return { createUIGameboards, displayUIHeader, showHitMarker, showMissMarker, displayShips, resetUIBoard };
}