/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
/*---------------------------- Variables (state) ----------------------------*/
  
let board;
let turn;
let winner;
let tie;
  
  /*------------------------ Cached Element References ------------------------*/
  
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');
  
  console.log(squareEls);
  console.log(messageEl);
  
  /*-------------------------------- Functions --------------------------------*/
  
  function init() {
    console.log('the game is initialized');
    board = ['', '', '',
             '', '', '',
             '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
  }
  
  function render() {
    updateBoard();
    updateMessage();
  }
  
  function updateBoard() {
    board.forEach((value, idx) => {
      squareEls[idx].textContent = value;
    });
  }
  
  function updateMessage() {
    if (winner) {
      messageEl.textContent = `Congratulations ${turn} You have won!`;
    } else if (tie) {
      messageEl.textContent = "Its a tie :)";
    } else {
      messageEl.textContent = `It's ${turn}'s turn`;
    }
  }
  
  function handleClick(event) {
    const squareIndex = event.target.id;
    if (board[squareIndex] !== '' || winner) return;
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }
  
  function placePiece(index) {
    board[index] = turn;
    console.log(board);
  }
  
  function checkForWinner() {
    winningCombos.forEach(combo => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
      }
    });
    console.log(winner);
  }
  
  function checkForTie() {
    if (winner) return;
    tie = board.every(square => square !== '');
    console.log(tie);
  }
  
  function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
    console.log(turn);
  }
  
  /*----------------------------- Event Listeners -----------------------------*/
  
  squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
  });
  
  resetBtnEl.addEventListener('click', init);

  init();
  