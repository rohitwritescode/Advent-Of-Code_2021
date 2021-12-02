const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const depthMeasurements = input.split("\n").map(depth => parseInt(depth));
let count = 0;

//Problem 1:
for (let i=1; i<=depthMeasurements.length; i++) {
    if (depthMeasurements[i] > depthMeasurements[i-1]) {
        count++;
    }
}

console.log('Number of measurements larger than previous measurement: ', count);

// Problem 2:
let window1Idx = 2;
let window2Idx = 1;
let count2 = 0;

for (let i=2; i<depthMeasurements.length; i++) {
    if (depthMeasurements[window1Idx] + depthMeasurements[window1Idx - 1] + depthMeasurements[window1Idx + 1] > 
        depthMeasurements[window2Idx] + depthMeasurements[window2Idx - 1] + depthMeasurements[window2Idx + 1]  ) {
        count2++;
    }
    window1Idx++;
    window2Idx++;
}

console.log('Number of measurement windows larger than previous measurement windows: ', count2);