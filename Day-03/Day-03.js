//Read input and organize into nested arrays:
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const binArrays = input.split("\r\n").map(binary => binary.split(''));

//Puzzle Parts 1 & 2 - Calculate Power Consumption & Life Support Rating:
function calculatePCAndLSR(binArrays) {

    //Calculate 2D array with bits sorted by index (1st bit of all inputs sorted into an array in index 1, 2nd bit of all inputs sorted into an array in index 2 etc):
    let sortedBinArray = new Array(binArrays[0].length).fill(0).map(() => new Array(binArrays.length).fill(0));
    binArrays.forEach((binArray, arrayIndex) => {
        binArray.forEach((bit, bitIndex) => {
            sortedBinArray[bitIndex][arrayIndex] = bit;
        });
    });

    //Calculate Gamma Rate:
    const gammaRateArray = sortedBinArray.map(bitArray => {
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
    function calculateLSR(binArrays, gammaRateArray, epsilonRateArray) {
        let reducingArray = new Array(binArrays.length).fill(0).map(() => new Array(binArrays[0].length).fill(0));
        reducingArray = [...binArrays]

        //Calculate Oxygen Generator Rating:
        gammaRateArray.forEach((gammaRateBit, gammaRatebitIndex) => {
            while(reducingArray.length > 1) {
                reduceBinArray(reducingArray, gammaRatebitIndex, gammaRateBit)
            }

            function reduceBinArray(binArrayToReduce, bitIndex, bitToCompare) {
                binArrayToReduce.forEach((binArray, binArrayIndex) => {
                    if(binArray[bitIndex] !== bitToCompare) {
                        binArrayToReduce.splice(binArrayIndex,1);
                    }
                });
                return binArrayToReduce;
            }
        });
        return reducingArray;
    }
    
    console.log('Raw Data', binArrays)
    console.log('Gamma', gammaRateArray)
    console.log('Reduced Array', calculateLSR(binArrays,gammaRateArray,epsilonRateArray));
}

calculatePCAndLSR(binArrays);