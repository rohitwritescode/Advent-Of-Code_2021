//Read input and organize into nested arrays:
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const arrays = input.split('\r\n\r\n').map((element, idx) => {
    if (idx !== 0 ) return element.split('\r\n')
    else return element
});

function drawNumber(array) {
    return array.shift();
}

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function lookupBingoBoards(bingoBoardsArray, numbersToLookup) {
    let checker = (arr, target) => target.every(v => arr.includes(v));
    const checkedBingoBoardsArray = bingoBoardsArray.map(board => board.map(row => checker(numbersToLookup,row)).some(element => element === true));
    return checkedBingoBoardsArray;
}

const numbersToDraw = arrays.shift().split(',').map(el => parseInt(el));
const bingoBoards = arrays.map(array => array.map(element => element.toString().split(' ').filter(cleanedEl => cleanedEl !== '').map(num => parseInt(num))));
const transposedBingoBoards = bingoBoards.map(board => transpose(board));

// console.log('Total numbers to draw', numbersToDraw.length);
// console.log('Transposed Boards', transposedBingoBoards[0]);

let drawnNumbers =[];
let gameOver = false;
while(gameOver !== true) {
    drawnNumbers.push(drawNumber(numbersToDraw));

    if(lookupBingoBoards(bingoBoards, drawnNumbers).some(board => board === true)) {
        gameOver = true;
        console.log('Game has been won!')
        const winningIndex = lookupBingoBoards(bingoBoards, drawnNumbers).findIndex(element => element === true);
        const scoreArray = bingoBoards[winningIndex].map(row => row.filter(el => !drawnNumbers.includes(el))).flat();
        const score = scoreArray.reduce((accumulator, val) => accumulator + val);
        console.log(score * drawnNumbers[drawnNumbers.length - 1]);
    } else if(lookupBingoBoards(transposedBingoBoards, drawnNumbers).some(board => board === true)){
        gameOver = true;
        console.log('Game has been won!')
        const winningIndex = lookupBingoBoards(transposedBingoBoards, drawnNumbers).findIndex(element => element === true);
        const scoreArray = transposedBingoBoards[winningIndex].map(row => row.filter(el => !drawnNumbers.includes(el))).flat();
        const score = scoreArray.reduce((accumulator, val) => accumulator + val);
        console.log(score * drawnNumbers[drawnNumbers.length - 1]);
    }
}




