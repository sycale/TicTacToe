import $ from "jquery";

var counter = 0;
var status = 0;
let firstPlayerCounter = 0;
let secondPlayerCounter = 0;

var cells = new Array();
for (let i = 0; i < 3; i++) {
  cells[i] = new Array();
}

function check_if_filled() {
  if (
    $(this).hasClass("checked") ||
    $(this).hasClass("checked-second_player")
  ) {
    return true;
  } else return false;
}

function turn() {
  if (status % 2 == 0) {
    $(this).addClass("checked");
    status += 1;
    $(".header__text").replaceWith(
      "<p class = 'header__text'> Second Player's turn</p>"
    );
  } else {
    $(this).addClass("checked-second_player");

    status += 1;

    $(".header__text").replaceWith(
      "<p class = 'header__text'> First Player's turn</p>"
    );
  }
}

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    cells[i].push(`.d${i}${j}`);
  }
}

function clear() {
  $(".cells").removeClass("checked");
  $(".cells").removeClass("checked-second_player");
  $(".header__text").replaceWith(
    "<p class = 'header__text'> First Player's turn</p>"
  );

  status = 0;
}

function printStatus() {
  $(".score").replaceWith(
    `<div class = 'score'> Score: ${firstPlayerCounter} - ${secondPlayerCounter} </div>`
  );
}

$(document).ready(function() {
  $(".cells").click(function() {
    if (!check_if_filled.call(this)) {
      turn.call(this);
      var result = gameOver();
      if (result == 1) {
        alert("First Player has won");
        printStatus();
        clear();
      } else if (result == 2) {
        printStatus();
        alert("Second Player has won");
        clear();
      } else if (result == 3) {
        alert("Draw");
        printStatus();
        clear();
      }
    } else {
      alert("Cant place here");
    }
  });
  $(".reset-btn").click(function() {
    firstPlayerCounter = 0;
    secondPlayerCounter = 0;
    $(".score").replaceWith(
      `<div class = 'score'> Score: ${firstPlayerCounter} - ${secondPlayerCounter} </div>`
    );
    clear();
  });
});

function gameOver() {
  let counter = 0;
  let winCond = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "11", "22"],
    ["02", "11", "20"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"]
  ];
  for (let c of winCond) {
    for (let q of c) {
      if ($(`.d${q}`).hasClass("checked")) {
        counter++;
      }
    }
    if (counter == 3) {
      firstPlayerCounter++;
      return 1;
    }
    counter = 0;
  }
  for (let c of winCond) {
    for (let q of c) {
      if ($(`.d${q}`).hasClass("checked-second_player")) {
        counter++;
      }
    }
    if (counter == 3) {
      secondPlayerCounter++;
      return 2;
    }
    counter = 0;
  }
}