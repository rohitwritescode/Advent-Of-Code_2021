//Read input and organize into nested arrays:
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const binArrays = input.split("\r\n").map(binary => binary.split(''));

//Puzzle Parts 1 & 2 - Calculate Power Consumption & Life Support Rating:
function calculatePCAndLSR(binArrays) {

    //Puzzle Part 1 - Calculate Power Consumption:
    //Calculate 2D array with bits sorted by index (1st bit of all inputs sorted into an array in index 1, 2nd bit of all inputs sorted into an array in index 2 etc):
    function convertToComparisonBinArray(input2DArray) {
        let modifiedArray = new Array(input2DArray[0].length).fill(0).map(() => new Array(input2DArray.length).fill(0));
        input2DArray.forEach((binArray, arrayIndex) => {
            binArray.forEach((bit, bitIndex) => {
                modifiedArray[bitIndex][arrayIndex] = bit;
            });
        });
        return modifiedArray;
    }    

    //Calculate Gamma Rate:
    const gammaRateArray = convertToComparisonBinArray(binArrays).map(bitArray => {
        if (bitArray.filter(bit => bit==0).length > bitArray.filter(bit => bit==1).length) {
            return 0;
        } else {
            return 1;
        }
    });

    //Calculate Epsilon Rate:
    const epsilonRateArray = gammaRateArray.map(bit => bit = 1- bit);

    //Calculate Power Consumption:
    const powerConsumption = parseInt(gammaRateArray.join(''), 2) * parseInt(epsilonRateArray.join(''), 2);
    console.log(`The Power Consumption is: ${powerConsumption}`)

    
    //Puzzle Part 2 - Calculate Life Support Rating:
    //Calculate Oxygen Generator Rating & CO2 Scrubber Rating:
    function calculateGasRating(gasRatingArray, descriptor) {
        let refIndex = 0;
        let zeroesIndexArray = [];
        let onesIndexArray = [];
        while(refIndex <= gasRatingArray[0].length && gasRatingArray.length > 1) {
            gasRatingArray.forEach((binArray, gasRatingIndex) => {
                if(parseInt(binArray[refIndex]) === 0) {
                    zeroesIndexArray.push(gasRatingIndex);
                } 
                else {
                    onesIndexArray.push(gasRatingIndex);
                } 
            });

            if(zeroesIndexArray.length > onesIndexArray.length) {
                //More zeroes than ones.
                if(descriptor === 'o2') {
                    for (let i = onesIndexArray.length -1; i >= 0; i--) { 
                        gasRatingArray.splice(onesIndexArray[i],1);
                    }
                }

                if(descriptor === 'co2') {
                    for (let i = zeroesIndexArray.length -1; i >= 0; i--) { 
                        gasRatingArray.splice(zeroesIndexArray[i],1);
                    }
                }
            } else if (onesIndexArray.length > zeroesIndexArray.length) {
                //More ones than zeroes.
                if(descriptor === 'o2') {
                    for (let i = zeroesIndexArray.length -1; i >= 0; i--) { 
                        gasRatingArray.splice(zeroesIndexArray[i],1);
                    }
                }
                if(descriptor === 'co2') {
                    for (let i = onesIndexArray.length -1; i >= 0; i--) { 
                        gasRatingArray.splice(onesIndexArray[i],1);
                    }
                }
            } else {
                //Equal number of zeroes and ones.
                if(descriptor === 'o2') {
                    for (let i = zeroesIndexArray.length -1; i >= 0; i--) { 
                        gasRatingArray.splice(zeroesIndexArray[i],1);
                    }
                }
                if(descriptor === 'co2') {
                    for (let i = onesIndexArray.length -1; i >= 0; i--) { 
                        gasRatingArray.splice(onesIndexArray[i],1);
                    }
                }
            }
            refIndex++;
            zeroesIndexArray.length = 0;
            onesIndexArray.length = 0;
        }
        return gasRatingArray[0];
    }

    let o2GenRatingArray = [];
    o2GenRatingArray = [...binArrays]

    let co2ScrubRatingArray = [];
    co2ScrubRatingArray = [...binArrays]

    const o2GenRating = calculateGasRating(co2ScrubRatingArray,'co2')
    const co2ScrubRating = calculateGasRating(o2GenRatingArray,'o2')

    //Puzzle Part 2 - Calculate Life Support Rating:
    const lifeSupportRating = parseInt(o2GenRating.join(''), 2) * parseInt(co2ScrubRating.join(''), 2);
    console.log(`The Life Support Rating is: ${lifeSupportRating}`)
}

calculatePCAndLSR(binArrays);