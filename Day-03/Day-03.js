//Read input and organize into nested arrays:
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const binArrays = input.split("\r\n").map(binary => binary.split(''));

//Puzzle Parts 1 & 2 - Calculate Power Consumption & Life Support Rating:
function calculatePCAndLSR(binArrays) {

    //Calculate 2D array with bits sorted by index (1st bit of all inputs sorted into an array in index 1, 2nd bit of all inputs sorted into an array in index 2 etc):
    function modifyBinArray(input2DArray) {
        let modifiedArray = new Array(input2DArray[0].length).fill(0).map(() => new Array(input2DArray.length).fill(0));
        input2DArray.forEach((binArray, arrayIndex) => {
            binArray.forEach((bit, bitIndex) => {
                modifiedArray[bitIndex][arrayIndex] = bit;
            });
        });
        return modifiedArray;
    }
    

    //Calculate Gamma Rate:
    const gammaRateArray = modifyBinArray(binArrays).map(bitArray => {
        if (bitArray.filter(bit => bit==0).length > bitArray.filter(bit => bit==1).length) {
            return 0;
        } else {
            return 1;
        }
    });

    //Calculate Epsilon Rate:
    const epsilonRateArray = gammaRateArray.map(bit => bit = 1- bit);

    //Puzzle Part 1 - Calculate Power Consumption:
    powerConsumption = parseInt(gammaRateArray.join(''), 2) * parseInt(epsilonRateArray.join(''), 2);
    console.log(`The Power Consumption is: ${powerConsumption}`)

    
    //Puzzle Part 2 - Calculate Life Support Rating:
    //Calculate Oxygen Generator Rating:
    function reduceBinArray(binArrayToReduce, bitIndex, bitToCompare) {
        binArrayToReduce.forEach((binArray, binArrayIndex) => {
            if(binArray[bitIndex] !== bitToCompare) {
                binArrayToReduce.splice(binArrayIndex,1);
            }
        });
        return binArrayToReduce;
    }

    let binArrays2 = [];
    binArrays2 = [...binArrays]
    let comparisonIndex = 0;
    const o2GenRating = modifyBinArray(binArrays2).map((binArray, binArrayIdx) => {
        if (binArray.filter(bit => bit==0).length > binArray.filter(bit => bit==1).length) {
            while (binArrays2.length > 1) {
                reduceBinArray(binArrays2,comparisonIndex,0);
            }   
        } else {
            while (binArrays2.length > 1) {
                reduceBinArray(binArrays2,comparisonIndex,0);
            }
        }
    });
    
    console.log('O2 Gen', o2GenRating)
}

calculatePCAndLSR(binArrays);