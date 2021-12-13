// Read input and organize into required arrays:
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const initLantFishArray = input.split(',').map(el => parseInt(el));

//Calculate no. of lantern fish:
function calculateNoOfLanternFish(lantFishInputArray, noOfDaysPassed, totalNoOfDays) {
    let lantFishGestArray = [...lantFishInputArray];
    let updatedLantFishGestArray;
    let newLantFishArray = [];
    while(noOfDaysPassed <= totalNoOfDays ) {
        updatedLantFishGestArray = lantFishGestArray.map(gestation => {
            if(gestation <= 0) {
                gestation = 6;
                newLantFishArray.push(8);
                return gestation;
            } else {
                gestation--;
                return gestation;
            }
        });
        lantFishGestArray = [...updatedLantFishGestArray, ...newLantFishArray];
        newLantFishArray = [];
        noOfDaysPassed++;
    }
    return updatedLantFishGestArray;
}

// Puzzle 1 output:
console.log("No of lantern fish after 80 days: ", calculateNoOfLanternFish(initLantFishArray,0,80).length);