const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

function puzzlePart1() {
    const movements = input.split("\r\n").map(movement => movement.split(' '));
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
    console.log(`Final Horizontal Position * Final Dpeth = ${forwardMovement * depth} `);
}

puzzlePart1();