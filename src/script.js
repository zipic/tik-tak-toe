let currentPlayer = 'X';
let gameBoardState = ['', '', '', '', '', '', '', '', ''];
let playerX = [];
let playerO = [];

function showMenu() {
  $('.menu').removeClass('hidden');
  $('.play').addClass('hidden');
}

function selectItem() {
  $('.game').removeClass('hidden');
  $('.menu').addClass('hidden');
  $('.play').addClass('hidden');

  updateCurrentPlayerDisplay();
}

function handleClick(button) {
  if ($(button).css('background-image') !== 'none') {
    return;
  }

  const index = parseInt($(button).attr('class').split(' ')[1]) - 1;

  gameBoardState[index] = currentPlayer;

  const imageUrl = currentPlayer === 'X' ? 'images/cross.svg' : 'images/circle1.svg';
  $(button).css({
    'background-image': 'url(' + imageUrl + ')',
    'background-size': 'cover',
    'width': '163px',
    'height': '163px'
  });

  if (checkForWinner()) {
    $('.statistic').removeClass('hidden');
    $('.game').addClass('hidden');
    $('.menu').addClass('hidden');

    if (currentPlayer === 'X') {
      playerX.push(1);
      playerO.push(0);
    } else {
      playerO.push(1);
      playerX.push(0);
    }
    updateStatistics();
    resetGame();
    return;
  }

  if (checkForTie()) {
    $('.statistic').removeClass('hidden');
    $('.game').addClass('hidden');
    $('.menu').addClass('hidden');
    resetGame();
    updateStatistics();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateCurrentPlayerDisplay();
}

function checkForWinner() {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combo of winCombinations) {
    const [a, b, c] = combo;
    if (gameBoardState[a] && gameBoardState[a] === gameBoardState[b] && gameBoardState[b] === gameBoardState[c]) {
      return true;
    }
  }

  return false;
}

function checkForTie() {
  if (gameBoardState.every(cell => cell !== '')) {
    playerX.push(0);
    playerO.push(0);
    return true;
  }
  return false;
}

function resetGame() {
  gameBoardState = ['', '', '', '', '', '', '', '', ''];

  $('.sq').css({
    'background-image': 'none',
    'background-size': 'cover',
    'width': '150px',
    'height': '150px'
  });

  currentPlayer = 'X';
}

function updateCurrentPlayerDisplay() {
  $('#currentPlayer').text(`Гравець: ${currentPlayer}`);
}

function updateStatistics() {
  const statisticContainer = $('#statistic tbody');
  statisticContainer.empty();
  let countX = 0;
  let countO = 0;

  for (let i = 0; i < playerX.length; i++) {
    if (playerX[i] === 1) {
      countX++;
    }

    if (playerO[i] === 1) {
      countO++;
    }
    const row = $('<tr>');
    const cell1 = $('<td>').text(playerX[i]);
    const cell2 = $('<td>').text(playerO[i]);
    row.append(cell1, cell2);
    statisticContainer.append(row);
  }

  const separatorRow = $('<tr>');
  statisticContainer.append(separatorRow);

  const resultHeader = $('<tr>');
  const headerCell1 = $('<th>').text('РЕЗУЛЬТАТ');
  resultHeader.append(headerCell1);
  statisticContainer.append(resultHeader);

  const resultRow = $('<tr>');
  const resultCell1 = $('<td>').text(countX);
  const resultCell2 = $('<td>').text(countO);
  resultRow.append(resultCell1, resultCell2);
  statisticContainer.append(resultRow);
}



function finishGame() {
  $('.statistic').addClass('hidden');
  $('.game').addClass('hidden');
  $('.menu').addClass('hidden');
  $('.play').removeClass('hidden');
  playerO = [];
  playerX = [];
}

function playAgain() {
  $('.statistic').addClass('hidden');
  $('.game').removeClass('hidden');
  resetGame();
  updateCurrentPlayerDisplay();
}
