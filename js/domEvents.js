$(document).ready(function() {
  try {
    if ($('.connectfour').length) {

      var htmlBoard = $('.connectfour');

      var numRows = htmlBoard.data('rows');
      var numCols = htmlBoard.data('cols');

      if (isNaN(numRows) || isNaN(numCols)) {
        throw new Error("data-rows or data-cols not defined in Jade/HTML");
      }

      var firstPlayer = htmlBoard.data('player1');
      var secondPlayer = htmlBoard.data('player2');

      //console.log(firstPlayer, secondPlayer);

      if (firstPlayer === undefined || secondPlayer === undefined) {
        throw new Error("data-player1 or data-player2 not defined in Jade/HTML");
      }

      // Create core math model object
      var connectFour = new ConnectFour(numRows, numCols, firstPlayer, secondPlayer);

      // UI elements for first and second player in DOM

      var uiFirstPlayer = $('.players .slot-red');
      var uiSecondPlayer = $('.players .slot-yellow');

      // Check if it worked
      //console.log(uiFirstPlayer, uiSecondPlayer);

      if (uiFirstPlayer.length === 0 || uiSecondPlayer.length === 0) {
        throw new Error("Divs with slot-red or slot-yellow classes not defined in Jade/HTML");
      }

      // Create UI object that changes UI stuff based on math
      var connectFourUI = new ConnectFourUI(uiFirstPlayer, uiSecondPlayer, htmlBoard);

      // Check if it worked
      //console.log(connectFourUI);

      // Show basic help message in start for UX
      connectFourUI.showIntro();

      // In case anywhere on the board is clicked
      $('.connectfour').click(function(event) {

        connectFourUI.cleanMessage();

        // get the target div or element
        var target = $(event.target);

        // get column number for data attribute
        var currentColumn = target.data('col');

        /*
         * if a child slot is clicked, get data attribute for column from the respective parent
         * div slot-container
         */
        if (currentColumn === undefined) {
          target = target.parent(); // slot-container in case slot was clicked
          currentColumn = target.data('col');
        }

        currentColumn = parseInt(currentColumn, 10); // be on the safe side

        /*console.log("Rows =", connectFour.rows,
            " Cols =", connectFour.cols,
            " Clicked col =", currentColumn,
            " Empty row =", connectFour.getEmptySlotRow(currentColumn)
        );*/

        // get the empty row for the target column
        var emptyRow = connectFour.getEmptySlotRow(currentColumn);

        if (connectFour.dropDisk(currentColumn) === true) {
          // check if the last move was the winning one for the current player

          // update UI for dropDisk on successful maths model update
          connectFourUI.dropDisk(emptyRow, currentColumn);

          // Check if the current player won
          if (connectFour.isWon(emptyRow, currentColumn)) {
            //console.log("I love winning");
            connectFourUI.drawWonMessage();
            connectFourUI.disableUI();
          } else {
            //switch players in core model
            connectFour.switchPlayer();
            // switch players in UI
            connectFourUI.switchPlayer();
          }

        } else {

          // if column is filled, show respective UI message
          connectFourUI.showColumnFillMessage();
        }

      });

    } else {
      throw new Error("The HTML page doesn't have the right section with class .connectfour to link to.");
    }
  } catch (err) {
    console.error(err.message);
  }
  return false;
});

document.addEventListener('DOMContentLoaded', function() {
  var connectFour = document.querySelector('.connectfour');
  var numRows = parseInt(connectFour.getAttribute('data-rows'), 10);
  var numCols = parseInt(connectFour.getAttribute('data-cols'), 10);

  console.log(numRows, numCols);

  for (var row = 0; row < numRows; row++) {
    var rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    for (var col = 0; col < numCols; col++) {
      var cell = document.createElement('div');
      cell.className = 'slot-container';
      cell.setAttribute('data-row', row);
      cell.setAttribute('data-col', col);
      cell.id = 'slot-' + row + '-' + col;

      var innerDiv = document.createElement('div');
      innerDiv.className = 'slot row-' + row + ' col-' + col;

      cell.appendChild(innerDiv);
      rowDiv.appendChild(cell);
    }
    connectFour.appendChild(rowDiv);
  }
});
