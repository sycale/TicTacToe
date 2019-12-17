import $ from "jquery";

global.jQuery = $;
global.$ = $;

function check_if_filled() {
  if (
    $(this).hasClass("checked") ||
    $(this).hasClass("checked-second_player")
  ) {
    return true;
  } else return false;
}


function turn_of_first(callback) {
  fds:
  $(".cells").click(function() {
    if (!check_if_filled.call(this)) {
      $(this).addClass("checked");
      callback();
    } else {
      alert("choose another cell");
      
    }
  });
}
function turn_of_second() {
  $(".cells").click(function() {
    if (!check_if_filled.call(this)) {
      $(this).addClass("checked-second_player");
      return;
    } else {
      alert("choose another cell");
      turn_of_second();
    }
  });
}
