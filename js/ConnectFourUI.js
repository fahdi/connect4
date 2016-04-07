//Connect4 Game UI class

/**
 * Connect4 Class just for the UI,
 * @class
 * @classdesc It handles the UI elements on the screen, players, bord condition and udpates with win notification
 */
class ConnectFourUI {
    /**
     * Create a ConnectFourUI object which has two players on a board. Its agnostic of number of rows and columns.
     * @constructor
     * @param firstPlayer
     * @param secondPlayer
     * @param board
     */
    constructor(firstPlayer = {}, secondPlayer = {}, board = {}) {
        this._currentPlayer = firstPlayer;
        this._firstPlayer = firstPlayer;
        this._secondPlayer = secondPlayer;
        this._board = board;
    }

    get currentPlayer() {
        return this._currentPlayer;
    }

    set currentPlayer(player) {
        this._currentPlayer = player;
    }

    get firstPlayer() {
        return this._firstPlayer;
    }

    set firstPlayer(player) {
        this._firstPlayer = player;
    }

    get secondPlayer() {
        return this._secondPlayer;
    }

    set secondPlayer(player) {
        this._secondPlayer = player;
    }

    /**
     * Toggles UI elements for players based on whose turn it is
     *
     * @returns {boolean}
     */
    switchPlayer() {
        if (this._currentPlayer === this._firstPlayer) {
            this._currentPlayer = this._secondPlayer;
            this._secondPlayer.show();
            this._firstPlayer.hide();
            //console.log("switched to second player in UI");
        } else {
            this._currentPlayer = this._firstPlayer;
            this._firstPlayer.show();
            this._secondPlayer.hide();
            //console.log("switched to first player in UI");
        }
        return true;
    }

    /**
     * Changes the class of the target slot which turns it red on yellow based on the current player
     * @param emptyRow
     * @param currentColumn
     */
    dropDisk(emptyRow, currentColumn) {
        let target = $(".slot-container[data-row='" + emptyRow + "'][data-col='" + currentColumn + "']").children();
        if (this._currentPlayer === this._firstPlayer) {
            target.addClass("slot-red");
        } else {
            target.addClass("slot-yellow");
        }

    }

    /**
     * Gives the board kinda disabled / greyed out look when called
     */
    disableUI() {
        this._board.unbind('click');
        this._board.addClass('connectfour-disabled');
        this._board.removeClass('connectfour');
    }

    /**
     * Draws the text message when a user wins
     */
    drawWonMessage() {
        var winner = '';
        if (this._currentPlayer === this._firstPlayer) {
            winner += 'one ';
        } else {
            winner += 'two ';
        }
        var message = "Player " + winner + "wins!";

        this.displayMessage(message);
    }

    /**
     * This function is used for displaying a message in the div above connect4 board
     * @param message
     */
    displayMessage(message) {
        $('.communicate').text(message);
    }

    /**
     * Is called in start when the starting instruction is displayed above board
     */
    showIntro() {
        this.displayMessage('Click on any slot in a column to start.');
    }

    /**
     * This is called to display a message when the whole column is filled with disks
     */
    showColumnFillMessage() {
        this.displayMessage('The column is already filled. Please try another column.');
    }

    /**
     * Clear out the message above the board in UI
     */
    cleanMessage() {
        this.displayMessage('');
    }
}

