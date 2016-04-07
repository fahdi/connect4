"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Connect4 Game UI class

/**
 * Connect4 Class just for the UI,
 * @class
 * @classdesc It handles the UI elements on the screen, players, bord condition and udpates with win notification
 */

var ConnectFourUI = function () {
    /**
     * Create a ConnectFourUI object which has two players on a board. Its agnostic of number of rows and columns.
     * @constructor
     * @param firstPlayer
     * @param secondPlayer
     * @param board
     */

    function ConnectFourUI() {
        var firstPlayer = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var secondPlayer = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var board = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, ConnectFourUI);

        this._currentPlayer = firstPlayer;
        this._firstPlayer = firstPlayer;
        this._secondPlayer = secondPlayer;
        this._board = board;
    }

    _createClass(ConnectFourUI, [{
        key: "switchPlayer",


        /**
         * Toggles UI elements for players based on whose turn it is
         *
         * @returns {boolean}
         */
        value: function switchPlayer() {
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

    }, {
        key: "dropDisk",
        value: function dropDisk(emptyRow, currentColumn) {
            var target = $(".slot-container[data-row='" + emptyRow + "'][data-col='" + currentColumn + "']").children();
            if (this._currentPlayer === this._firstPlayer) {
                target.addClass("slot-red");
            } else {
                target.addClass("slot-yellow");
            }
        }

        /**
         * Gives the board kinda disabled / greyed out look when called
         */

    }, {
        key: "disableUI",
        value: function disableUI() {
            this._board.unbind('click');
            this._board.addClass('connectfour-disabled');
            this._board.removeClass('connectfour');
        }

        /**
         * Draws the text message when a user wins
         */

    }, {
        key: "drawWonMessage",
        value: function drawWonMessage() {
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

    }, {
        key: "displayMessage",
        value: function displayMessage(message) {
            $('.communicate').text(message);
        }

        /**
         * Is called in start when the starting instruction is displayed above board
         */

    }, {
        key: "showIntro",
        value: function showIntro() {
            this.displayMessage('Click on any slot in a column to start.');
        }

        /**
         * This is called to display a message when the whole column is filled with disks
         */

    }, {
        key: "showColumnFillMessage",
        value: function showColumnFillMessage() {
            this.displayMessage('The column is already filled. Please try another column.');
        }

        /**
         * Clear out the message above the board in UI
         */

    }, {
        key: "cleanMessage",
        value: function cleanMessage() {
            this.displayMessage('');
        }
    }, {
        key: "currentPlayer",
        get: function get() {
            return this._currentPlayer;
        },
        set: function set(player) {
            this._currentPlayer = player;
        }
    }, {
        key: "firstPlayer",
        get: function get() {
            return this._firstPlayer;
        },
        set: function set(player) {
            this._firstPlayer = player;
        }
    }, {
        key: "secondPlayer",
        get: function get() {
            return this._secondPlayer;
        },
        set: function set(player) {
            this._secondPlayer = player;
        }
    }]);

    return ConnectFourUI;
}();

//# sourceMappingURL=ConnectFourUI-compiled.js.map