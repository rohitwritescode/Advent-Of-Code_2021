// Read input and organize into required arrays:
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const arrays = input.split('\r\n\r\n').map((element, idx) => {
    if (idx !== 0 ) return element.split('\r\n')
    else return element
});

// Puzzles 1 and 2: Calculate score for first game and last game that is won:
function solvePuzzles(inputArrays) {
    // Select numbers to draw and move into an array:
    const numbersToDraw = inputArrays.shift().split(',').map(el => parseInt(el));

    // Select and transpose bingo boards into arrays:
    const bingoBoards = inputArrays.map(array => array.map(element => element.toString().split(' ').filter(cleanedEl => cleanedEl !== '').map(num => parseInt(num))));
    const transposedBingoBoards = bingoBoards.map(board => transpose(board));

    // Draw number from available array of numbers:
    function drawNumber(array) {
        return array.shift();
    }

    // Transpose board for easy comparison using array methods:
    function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    // Check array of boards with numbers that have been drawn so far:
    function lookupBingoBoards(bingoBoardsArray, numbersToLookup) {
        const checker = (arr, target) => target.every(v => arr.includes(v));
        const checkedBingoBoardsArray = bingoBoardsArray.map(board => board.map(row => checker(numbersToLookup,row)).some(element => element === true));
        return checkedBingoBoardsArray;
    }

    // Begin drawing numbers one by one, and verify drawn numbers with all boards:
    let drawnNumbers =[];
    let firstBoardWon = false;
    let lastBoardWon = false;
    let indexOfLastBoard;
    let gameStateInitArray = new Array(bingoBoards.length).fill(false);
    let gameStateTrueIndices = new Set();
    let gameState = [];
    while(!firstBoardWon || !lastBoardWon) {    
        drawnNumbers.push(drawNumber(numbersToDraw));

        // Puzzle Part 1: Find first board that wins the game:
        function findFirstBoardWon(currentState, arrayOfBoards, numbersDrawnSoFar) {
            if(currentState.some(board => board === true)) {
                firstBoardWon = true;
                const winningIndex = currentState.findIndex(element => element === true);
                const scoreArray = arrayOfBoards[winningIndex].map(row => row.filter(el => !numbersDrawnSoFar.includes(el))).flat();

                // Calculate final score:
                const score = scoreArray.reduce((accumulator, val) => accumulator + val) * numbersDrawnSoFar[numbersDrawnSoFar.length - 1];
                console.log("Puzzle 1: First board has been won! Score: ", score);
            }
        }    
        
        // Puzzle Part 2: Find last board that wins the game:
        function findLastBoardWon(currentState, arrayOfBoards, numbersDrawnSoFar) {
            if(currentState.every(board => board === true)) {
                lastBoardWon = true;
                indexOfLastBoard = [...gameStateTrueIndices][gameStateTrueIndices.size - 1];
                const scoreArray = arrayOfBoards[indexOfLastBoard].map(row => row.filter(el => !numbersDrawnSoFar.includes(el))).flat();

                // Calculate final score:
                const score = scoreArray.reduce((accumulator, val) => accumulator + val) * numbersDrawnSoFar[numbersDrawnSoFar.length - 1];
                console.log("Puzzle 2: Last board has been won! Score: ", score);
            }
        }
        
        // Find all boards that have won so far, and boards that are yet to win:
        function getLatestGameState(boards, transposedBoards, numbersDrawnSoFar) {
            lookupBingoBoards(boards, numbersDrawnSoFar).map((board, idx) => {
                if(board === true) {
                    gameStateTrueIndices.add(idx);
                }
            });
            lookupBingoBoards(transposedBoards, numbersDrawnSoFar).map((board, idx) => {
                if(board === true) {
                    gameStateTrueIndices.add(idx);
                }
            });
            return gameStateInitArray.map((board, idx) => {
                if (gameStateTrueIndices.has(idx)) {
                    board = true;
                } 
                return board;
            })
        }
        
        // Get the latest state of the game:
        gameState = [...getLatestGameState(bingoBoards,transposedBingoBoards,drawnNumbers)];
        if (!firstBoardWon) {
            findFirstBoardWon(gameState, bingoBoards, drawnNumbers);
        } else {
            findLastBoardWon(gameState, bingoBoards, drawnNumbers);
        }
    }
}

solvePuzzles(arrays);