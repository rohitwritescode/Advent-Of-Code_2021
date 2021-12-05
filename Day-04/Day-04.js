//Read input and organize into required arrays:
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const arrays = input.split('\r\n\r\n').map((element, idx) => {
    if (idx !== 0 ) return element.split('\r\n')
    else return element
});

// Puzzle 1: Calculate score for first game that is won:
function puzzle1CalculateScore(inputArrays) {
    const numbersToDraw = inputArrays.shift().split(',').map(el => parseInt(el));
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
        let checker = (arr, target) => target.every(v => arr.includes(v));
        const checkedBingoBoardsArray = bingoBoardsArray.map(board => board.map(row => checker(numbersToLookup,row)).some(element => element === true));
        return checkedBingoBoardsArray;
    }

    // Begin drawing numbers one by one, and verify drawn numbers with all boards:
    let drawnNumbers =[];
    let gameOver = false;
    while(gameOver !== true) {
        drawnNumbers.push(drawNumber(numbersToDraw));

        // Check to see if game has been won among regular boards and transposed boards:
        function checkBoardsAgainstNumbersDrawn(arrayOfBoards, numbersDrawnSoFar) {
            if(lookupBingoBoards(arrayOfBoards, numbersDrawnSoFar).some(board => board === true)) {
                gameOver = true;
                const winningIndex = lookupBingoBoards(arrayOfBoards, numbersDrawnSoFar).findIndex(element => element === true);
                const scoreArray = arrayOfBoards[winningIndex].map(row => row.filter(el => !numbersDrawnSoFar.includes(el))).flat();

                //Calculate final score:
                const score = scoreArray.reduce((accumulator, val) => accumulator + val) * numbersDrawnSoFar[numbersDrawnSoFar.length - 1];
                console.log("Puzzle 1: Game has been won! Score: ", score);
            }
        }
        checkBoardsAgainstNumbersDrawn(bingoBoards, drawnNumbers)
        checkBoardsAgainstNumbersDrawn(transposedBingoBoards, drawnNumbers)
    }

}

puzzle1CalculateScore(arrays);