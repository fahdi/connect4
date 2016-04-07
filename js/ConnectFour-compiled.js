"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Connect4 Game class

/**
 * Creates an object of ConnectFour game
 * @class
 * @classdesc Each object has two players and a defined number of rows and columns in a board
 */

var ConnectFour = function () {
    /**
     * Create a ConnectFour object which has two players and is defined by a number of rows and columns.
     * @constructor
     * @property numRows
     * @property numCols
     */

    function ConnectFour(numRows, numCols, firstPlayer, secondPlayer) {
        _classCallCheck(this, ConnectFour);

        this._rows = numRows;
        this._cols = numCols;
        this._board = [];
        this._currentPlayer = firstPlayer;
        this._firstPlayer = firstPlayer;
        this._secondPlayer = secondPlayer;

        //console.log(this._height);

        // initializing the board
        for (var counter = 0; counter < numRows; counter++) {
            this.board[counter] = [];
            for (var counter2 = 0; counter2 < numCols; counter2++) {
                this.board[counter][counter2] = 0;
            }
        }
        this._length = numRows * numCols;
        this._inRowForWin = 4; // can be changed for different length
    }

    _createClass(ConnectFour, [{
        key: "switchPlayer",


        /**
         * Toggles players based on whose turn it is
         */
        value: function switchPlayer() {
            if (this._currentPlayer === this._firstPlayer) {
                this._currentPlayer = this._secondPlayer;
                //console.log("switched to second player in core");
                return true;
            } else {
                this._currentPlayer = this._firstPlayer;
                //console.log("switched to first player in core");
                return true;
            }
        }

        /**
         * Drops a disk in a column counter.e. updates array with the right number based on player. Defaults to first player
         * @param colNumber
         * @returns {boolean}
         */

    }, {
        key: "dropDisk",
        value: function dropDisk(colNumber) {
            var value;
            if (this._currentPlayer === this._firstPlayer) {
                value = 1; // assign 1 to first player
            } else {
                    value = -1; // assign -1 to second player
                }
            try {

                if (colNumber < this._cols) {
                    // Get the lowest empty slot's row value in a column
                    var emptySlotRow = this.getEmptySlotRow(colNumber);
                    // Check if its first or an other row, we use -1 as a flag to indicate the column is filled already
                    if (emptySlotRow >= 0) {
                        this._board[emptySlotRow][colNumber] = value;

                        // see which value is actually being saved
                        //value == 1 ? console.log("first player value saved") : console.log("2nd player value saved");

                        //check for winning in response to the recent disk drop
                        //console.log("checking for [" + emptySlotRow + "][" + colNumber + ']');

                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } catch (err) {
                console.error(err.message);
                return false;
            }
        }

        /**
         * When called with column number is a parameter, returns the top empty slot info as row number.
         * @param colNumber
         * @returns {*} count
         */

    }, {
        key: "getEmptySlotRow",
        value: function getEmptySlotRow(colNumber) {
            for (var counter = this._rows - 1; counter >= 0; counter--) {
                if (this._board[counter][colNumber] === 0) {
                    break;
                }
            }
            return counter;
        }

        /**
         * Check if game is won by the current player after each move
         * @param rowNumber
         * @param colNumber
         * @returns {boolean}
         */

    }, {
        key: "isWon",
        value: function isWon(rowNumber, colNumber) {
            var isWon = false;
            if (this._board[rowNumber][colNumber] !== 0) {
                isWon = isWon ? isWon : this.areFourConnected(rowNumber, colNumber, 1, 0);
                isWon = isWon ? isWon : this.areFourConnected(rowNumber, colNumber, 1, -1);
                isWon = isWon ? isWon : this.areFourConnected(rowNumber, colNumber, 0, 1);
                isWon = isWon ? isWon : this.areFourConnected(rowNumber, colNumber, 1, 1);
            }
            return isWon;
        }

        /**
         * Checks if four are in row; returns true, if so.
         * @param rowNumber
         * @param colNumber
         * @param x
         * @param y
         * @returns {boolean}
         */

    }, {
        key: "areFourConnected",
        value: function areFourConnected(rowNumber, colNumber, x, y) {
            var player = this._board[rowNumber][colNumber];
            var length = 1;

            var counter = 1;

            while (this.isOnBoard(rowNumber + x * counter, colNumber + y * counter)) {
                //console.log("checking at  [" + (rowNumber + xAxis * counter) + "][" + (colNumber + yAxis * counter) + "]");
                if (this._board[rowNumber + x * counter][colNumber + y * counter] === player) {
                    length++;
                    counter++;
                } else {
                    break;
                }
            }

            counter = -1; // reset

            while (this.isOnBoard(rowNumber + x * counter, colNumber + y * counter)) {
                //console.log("checking at  [" + (rowNumber + xAxis * counter) + "][" + (colNumber + yAxis * counter) + "]");
                if (this._board[rowNumber + x * counter][colNumber + y * counter] === player) {
                    length++;
                    counter--;
                } else {
                    break;
                }
            }

            return length >= this._inRowForWin;
        }

        /**
         * Checks if specific row and column exist as per board specs
         * @param rowNumber
         * @param colNumber
         * @returns {boolean}
         */

    }, {
        key: "isOnBoard",
        value: function isOnBoard(rowNumber, colNumber) {
            {
                return 0 <= rowNumber && rowNumber < this._rows && 0 <= colNumber && colNumber < this._cols;
            }
        }
    }, {
        key: "length",
        get: function get() {
            return this._length;
        }
    }, {
        key: "rows",
        get: function get() {
            return this._rows;
        },
        set: function set(v) {
            this._rows = v;
        }
    }, {
        key: "cols",
        get: function get() {
            return this._cols;
        },
        set: function set(v) {
            this._cols = v;
        }
    }, {
        key: "board",
        get: function get() {
            return this._board;
        },
        set: function set(v) {
            this._board = v;
        }
    }, {
        key: "currentPlayer",
        get: function get() {
            return this._currentPlayer;
        },
        set: function set(v) {
            this._currentPlayer = v;
        }
    }, {
        key: "firstPlayer",
        get: function get() {
            return this._firstPlayer;
        },
        set: function set(v) {
            this._firstPlayer = v;
        }
    }, {
        key: "secondPlayer",
        get: function get() {
            return this._secondPlayer;
        },
        set: function set(v) {
            this._secondPlayer = v;
        }
    }]);

    return ConnectFour;
}();

//# sourceMappingURL=ConnectFour-compiled.js.map