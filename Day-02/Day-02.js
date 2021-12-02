//Read input and organize into nested arrays:
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const movements = input.split("\r\n").map(movement => movement.split(' '));

// Puzzle part 1:
function puzzlePart1() {
    let forwardMovement = 0;
    let depth = 0;
    movements.forEach(movement => {
        if (movement[0] === 'forward') {
            forwardMovement+= parseInt(movement[1]);
        } else if (movement[0] === 'down') {
            depth+= parseInt(movement[1]); 
        } else {
            depth-= parseInt(movement[1]);
        }
    });
    console.log(`Puzzle Part 1: Final Horizontal Position * Final Depth = ${forwardMovement * depth} `);
}

//Puzzle part 2:
function puzzlePart2() {
    let forwardMovement = 0;
    let depth = 0;
    let aim = 0;
    movements.forEach(movement => {
        if (movement[0] === 'forward') {
            forwardMovement+= parseInt(movement[1]);
            depth+= (aim * parseInt(movement[1]));
        } else if (movement[0] === 'down') {
            aim+= parseInt(movement[1]);
        } else {
            aim-= parseInt(movement[1]);
        }
    });
    console.log(`Puzzle Part 2: Final Horizontal Position * Final Depth = ${forwardMovement * depth} `);
}

puzzlePart1();
puzzlePart2();