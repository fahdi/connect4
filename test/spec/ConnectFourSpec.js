/*jshint -W117 */
(function () {
    "use strict";
    describe('Connect Four Board', function () {
        describe('Allows us to setup a connect4 game object', function () {
            it('1. should be able to define a board and grid dimensions', function () {
                var Connect4Board = new ConnectFour(3, 4);
                expect(Connect4Board.rows === 3).toBe(true);
                expect(Connect4Board.cols === 4).toBe(true);
                expect(Connect4Board.rows === 7).toBe(false);

            });
            it('2. should be able to define a board and grid dimensions', function () {
                var Connect4Board = new ConnectFour(6, 7);
                expect(Connect4Board.rows === 6).toBe(true);
                expect(Connect4Board.cols === 7).toBe(true);
                expect(Connect4Board.rows === 8).toBe(false);
                expect(Connect4Board.cols === 9).toBe(false);
            });

            it('3. should be able to set and get the values for whole board array', function () {
                var Connect4Board;
                Connect4Board = new ConnectFour(6, 7);
                Connect4Board.board =
                    [
                        [1, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 1, 0, 0, 1],
                        [0, 0, 0, 1, 0, 1, 1],
                        [0, 0, 0, 1, 1, 1, 1],
                        [0, 0, 0, 1, 1, 1, 1],
                        [0, 0, 1, 1, 1, 1, 1]
                    ];
                expect(Connect4Board.board[0][3] === 0).toBe(true);
                expect(Connect4Board.board[5][4] === 1).toBe(true);
                expect(Connect4Board.board[5][6] === 1).toBe(true);
                expect(Connect4Board.board[5][1] === 0).toBe(true);
                expect(Connect4Board.board[4][4] === 1).toBe(true);
                expect(Connect4Board.board[5][0] === 1).toBe(false);
                expect(Connect4Board.board[0][0] === 0).toBe(false);
            });

        });

        // switch Player
        describe('Should be to switch player', function () {

            var Connect4Board = new ConnectFour(6, 9, "X", "Y");
            it('1. Should have first player as  current player', function () {
                expect(Connect4Board._currentPlayer === "X").toBe(true);
            });
            it('2. Should switch back and forth between the player, on each call', function () {
                Connect4Board.switchPlayer();
                //console.log(Connect4Board._currentPlayer);
                expect(Connect4Board._currentPlayer === "Y").toBe(true);
                expect(Connect4Board._currentPlayer === "X").toBe(false);
                expect(Connect4Board._currentPlayer === "Z").toBe(false);
                Connect4Board.switchPlayer();
                expect(Connect4Board._currentPlayer === "X").toBe(true);
                expect(Connect4Board._currentPlayer === "Y").toBe(false);
                expect(Connect4Board._currentPlayer === "A").toBe(false);
            });

            it('3. Always return true', function () {
                expect(Connect4Board.switchPlayer() === true).toBe(true);
            });
        });

        describe('Should be able to return the top slot for a column ', function () {

            var Connect4Board = new ConnectFour(6, 9, "X", "Y");
            it('1. Expect all empty slot rows be to be the last one when the board is initialized', function () {
                for (let i = 0; i < 9; i++) {
                    expect(Connect4Board.getEmptySlotRow(i) === 5).toBe(true); // 5 being the last row
                }
            });
            it('2. Expect all rows be to be the last one when the board is initialized', function () {
                for (let i = 0; i < 9; i++) {
                    expect(Connect4Board.getEmptySlotRow(i) === 0).toBe(false);
                }
            });
            it('3. Test if board updates are reflected by the function response', function () {
                var Connect4Board = new ConnectFour(6, 7, "X", "Y");
                Connect4Board._board =
                    [
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 1, 0, 0, 1],
                        [0, 0, 0, 1, 0, 1, 1],
                        [0, 0, 0, 1, 1, 1, 1],
                        [0, 0, 0, 1, 1, 1, 1],
                        [0, 0, 1, 1, 1, 1, 1]
                    ];

                expect(Connect4Board.getEmptySlotRow(6) === 0).toBe(true);
                expect(Connect4Board.getEmptySlotRow(0) === 5).toBe(true);
                expect(Connect4Board.getEmptySlotRow(1) === 4).toBe(false); // update to test again in next step
                expect(Connect4Board.getEmptySlotRow(4) === 2).toBe(true);  // update to test again in next step

                Connect4Board._board =
                    [
                        [0, 0, 0, 0, 0, 0, 1],
                        [0, 0, 0, 1, 0, 0, 1],
                        [0, 0, 0, 1, 0, 1, 1],
                        [0, 0, 0, 1, 1, 1, 1],
                        [0, 0, 0, 1, 1, 1, 1],
                        [0, 1, 1, 1, 1, 1, 1]
                    ];
                // test for completely filled column
                expect(Connect4Board.getEmptySlotRow(6) === -1).toBe(true);
                // and for completely empty column
                expect(Connect4Board.getEmptySlotRow(0) === 5).toBe(true);
                expect(Connect4Board.getEmptySlotRow(1) === 4).toBe(true);
                expect(Connect4Board.getEmptySlotRow(3) === 0).toBe(true);

            });
        });

        // drop disk
        describe('Drop disk in a column', function () {
            var Connect4Board = new ConnectFour(6, 7);
            it('1. Should be able to drop disk in a column ', function () {
                expect(true).toBe(true);
                expect(Connect4Board.dropDisk(1)).toBe(true);
                expect(Connect4Board.dropDisk(0)).toBe(true);
            });
            it('2. Should\'t be able to drop disk in a column that exceeds or precedes the board column length ', function () {

                expect(Connect4Board.dropDisk(10)).toBe(false);
                expect(Connect4Board.dropDisk(9)).toBe(false);
                expect(Connect4Board.dropDisk(-1)).toBe(false);
            });

        });

        // winning game scenarios
        describe('Check for winning situations', function () {
            var Connect4Board;
            Connect4Board = new ConnectFour(6, 7, "RED", "YELLOW");
            it('1. No winning yet', function () {

                // mock the board
                Connect4Board._board =
                    [
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, -1, -1, 1, 0],
                        [0, 0, 0, 1, 1, -1, 1],
                        [0, 0, -1, -1, -1, 1, -1],
                        [0, 0, 1, 1, 1, -1, 1]
                    ];


                // mock not won yet situation
                var rowNumber = 4;
                var colNumber = 2;

                expect(Connect4Board.isWon(rowNumber, colNumber)).toBe(false);
            });
            it('2. YELLOW should win', function () {

                // mock the board
                var rowNumber = 1;
                var colNumber = 3;
                Connect4Board._board =
                    [
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, -1, 0, 0, 0],
                        [0, 0, 0, -1, -1, 1, 0],
                        [0, 0, 0, 1, 1, -1, 1],
                        [0, 0, 0, -1, -1, 1, -1],
                        [0, 0, 1, 1, 1, -1, 1]
                    ];
                // mock the final disk drop


                expect(Connect4Board.isWon(rowNumber, colNumber)).toBe(true);
            });

            it('3. RED should win', function () {

                // mocking a series of moves as in this screen-shot:
                // http://s30.postimg.org/856u356r5/Screen_Shot_2016_03_31_at_2_36_36_PM.png

                // winning move at
                var rowNumber = 1;
                var colNumber = 3;

                Connect4Board._board =
                    [
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 1, 0, 0, 0],
                        [0, 0, 0, 1, -1, 0, 0],
                        [0, 0, -1, 1, -1, 0, 0],
                        [0, 0, -1, 1, 1, -1, 0],
                        [0, 0, 1, -1, -1, 1, 1]
                    ];

                expect(Connect4Board.isWon(rowNumber, colNumber)).toBe(true);

            });

        });

        describe('Test method areFourConnected(): ' +
            'Checks x in a row, where x is implicitly defined in class as _inRowForWin=4', function () {
            var Connect4Board = new ConnectFour(6, 7, "RED", "YELLOW");
            it('Multiple checks one of which is true for this specific move.', function () {

                // mock winning move at
                var rowNumber = 1;
                var colNumber = 3;

                // Mock a win

                Connect4Board._board =
                    [
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 1, 0, 0, 0],
                        [0, 0, 0, 1, -1, 0, 0],
                        [0, 0, -1, 1, -1, 0, 0],
                        [0, 0, -1, 1, 1, -1, 0],
                        [0, 0, 1, -1, -1, 1, 1]
                    ];

                expect(Connect4Board.areFourConnected(rowNumber, colNumber, 1, 0)).toBe(true);
                expect(Connect4Board.areFourConnected(rowNumber, colNumber, 1, -1)).toBe(false);
                expect(Connect4Board.areFourConnected(rowNumber, colNumber, 0, 1)).toBe(false);
                expect(Connect4Board.areFourConnected(rowNumber, colNumber, 1, 1)).toBe(false);

            });
        });

        // winning game scenarios
        describe('isOnBoard: Checks if a specific row/column is on board', function () {
            var Connect4Board;
            Connect4Board = new ConnectFour(6, 7, "RED", "YELLOW");
            it('1. [1][2] is on board', function () {
                expect(Connect4Board.isOnBoard(1, 2)).toBe(true);
            });
            it('2. [7][8] is not on board with length [6][7]', function () {
                expect(Connect4Board.isOnBoard(7, 8)).toBe(false);
            });
        });


    });
})
();