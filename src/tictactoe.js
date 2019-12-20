import $ from 'jquery';

let status = 0;
let firstPlayerCounter = 0;
let secondPlayerCounter = 0;

const cells = [];
for (let i = 0; i < 3; i += 1) {
  cells[i] = [];
}

function checkFill() {
  if ($(this).hasClass('checked') || $(this).hasClass('checked-second_player')) {
    return true;
  }
  return false;
}

function turn() {
  if (status % 2 === 0) {
    $(this).addClass('checked');
    status += 1;
    $('.header__text').replaceWith('<p class = "header__text"> Second Player\'s turn</p>');
  } else {
    $(this).addClass('checked-second_player');

    status += 1;

    $('.header__text').replaceWith('<p class = "header__text"> First Player\'s turn</p>');
  }
}

for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    cells[i].push(`.d${i}${j}`);
  }
}

function clear() {
  $('.cells').removeClass('checked');
  $('.cells').removeClass('checked-second_player');
  $('.header__text').replaceWith('<p class = "header__text"> First Player\'s turn</p>');

  status = 0;
}

function printStatus(callback) {
  $('.score').replaceWith(`<div class = 'score'> Score: ${firstPlayerCounter} - ${secondPlayerCounter} </div>`);
  callback();
}

function gameOver() {
  let counter = 0;
  const winCond = [
    ['00', '01', '02'],
    ['10', '11', '12'],
    ['20', '21', '22'],
    ['00', '11', '22'],
    ['02', '11', '20'],
    ['00', '10', '20'],
    ['01', '11', '21'],
    ['02', '12', '22']];
  for (let i = 0; i < 8; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if ($(`.d${winCond[i][j]}`).hasClass('checked')) {
        counter += 1;
      }
    }
    if (counter === 3) {
      firstPlayerCounter += 1;
      return 1;
    }
    counter = 0;
  }
  for (let i = 0; i < 8; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if ($(`.d${winCond[i][j]}`).hasClass('checked-second_player')) {
        counter += 1;
      }
    }
    if (counter === 3) {
      secondPlayerCounter += 1;
      return 2;
    }
    counter = 0;
  }
  counter = 0;
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (
        $(`.d${i}${j}`).hasClass('checked')
        || $(`.d${i}${j}`).hasClass('checked-second_player')
      ) {
        counter += 1;
      }
    }
  }
  if (counter === 9) {
    return 3;
  }
  return 0;
}


$(document).ready(() => {
  $('.cells').click(function () {
    if (!checkFill.call(this)) {
      turn.call(this);
      const result = gameOver();
      if (result === 1) {
        alert('First Player has won');
        printStatus(clear);
      } else if (result === 2) {
        printStatus(clear);
        alert('Second Player has won');
      } else if (result === 3) {
        alert('Draw');
        printStatus(clear);
      }
    } else {
      alert('Cant place here');
    }
  });
  $('.reset-btn').click(() => {
    firstPlayerCounter = 0;
    secondPlayerCounter = 0;
    $('.score').replaceWith(`<div class = 'score'> Score: ${firstPlayerCounter} - ${secondPlayerCounter} </div>`);
    clear();
  });
});
