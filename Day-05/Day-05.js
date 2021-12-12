// Read input and organize into required coordinate arrays:
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
let x1Array = [];
let y1Array = [];
let x2Array = [];
let y2Array = [];
input.split('\r\n').forEach(coordSet => {
    x1Array.push(parseInt((coordSet.split(/,| /))[0]));
    y1Array.push(parseInt((coordSet.split(/,| /))[1]));
    x2Array.push(parseInt((coordSet.split(/,| /))[3]));
    y2Array.push(parseInt((coordSet.split(/,| /))[4]));
});

const xMax = getMaxOfArray([...x1Array,...x2Array])+1;
const yMax = getMaxOfArray([...y1Array,...y2Array])+1;
const coordMap1 = new Array(yMax).fill(0).map(() => new Array(xMax).fill(0));
const coordMap2 = new Array(yMax).fill(0).map(() => new Array(xMax).fill(0));

// Get max value from an array:
function getMaxOfArray(arr) {
    return arr.reduce((accumulator, element) => {
         return Math.max(accumulator, element);
     });
}
 
// Generate coordinates between end points: 
function getIndividualLineCoordinates(x1,y1,x2,y2,coordMapToUpdate, puzzleBool) {
    // Check conditions for Puzzle 1:
    if (x1 === x2) {
        if (y1 < y2) {
            for (let i = y1; i <= y2; i++) {
            coordMapToUpdate[i][x1] === 0 ? coordMapToUpdate[i][x1] = 1 : coordMapToUpdate[i][x1]++;
            }
        } else if (y2 < y1) {
            for (let i = y2; i <= y1; i++) {
                coordMapToUpdate[i][x1] === 0 ? coordMapToUpdate[i][x1] = 1 : coordMapToUpdate[i][x1]++;
            }
        }
    } else if(y1 === y2) {
        if (x1 < x2) {
            for (let i = x1; i <= x2; i++) {
                coordMapToUpdate[y1][i] === 0 ? coordMapToUpdate[y1][i] = 1 : coordMapToUpdate[y1][i]++;
            }
        } else if (x2 < x1) {
            for (let i = x2; i <= x1; i++) {
                coordMapToUpdate[y1][i] === 0 ? coordMapToUpdate[y1][i] = 1 : coordMapToUpdate[y1][i]++;
            }
        }
    }
    
    // Check condition for Puzzle 2:
    else if(Math.abs(x1 - x2) === Math.abs(y1 - y2) && puzzleBool === true) {
        let xSrcIndex = x1;
        let xDestIndex = x2;
        let ySrcIndex = y1;
        let yDestIndex = y2;
        coordMapToUpdate[ySrcIndex][xSrcIndex] === 0 ? coordMapToUpdate[ySrcIndex][xSrcIndex] = 1 : coordMapToUpdate[ySrcIndex][xSrcIndex]++;

        while(xSrcIndex != xDestIndex && ySrcIndex != yDestIndex) {
            if (ySrcIndex <= yDestIndex) {
                ySrcIndex++;
                if (xSrcIndex <= xDestIndex) {
                    xSrcIndex++;
                    coordMapToUpdate[ySrcIndex][xSrcIndex] === 0 ? coordMapToUpdate[ySrcIndex][xSrcIndex] = 1 : coordMapToUpdate[ySrcIndex][xSrcIndex]++;
                } else if (xSrcIndex >= xDestIndex) {
                    xSrcIndex--;
                    coordMapToUpdate[ySrcIndex][xSrcIndex] === 0 ? coordMapToUpdate[ySrcIndex][xSrcIndex] = 1 : coordMapToUpdate[ySrcIndex][xSrcIndex]++;
                    
                }
            } else if (ySrcIndex >= yDestIndex) {
                ySrcIndex--;
                if (xSrcIndex <= xDestIndex) {
                    xSrcIndex++;
                    coordMapToUpdate[ySrcIndex][xSrcIndex] === 0 ? coordMapToUpdate[ySrcIndex][xSrcIndex] = 1 : coordMapToUpdate[ySrcIndex][xSrcIndex]++;
                } else if (xSrcIndex >= xDestIndex) {
                    xSrcIndex--;
                    coordMapToUpdate[ySrcIndex][xSrcIndex] === 0 ? coordMapToUpdate[ySrcIndex][xSrcIndex] = 1 : coordMapToUpdate[ySrcIndex][xSrcIndex]++;
                }
            }
        }
    }
    return coordMapToUpdate;
}

// Update overall coordinate map:
function getLatestCoordMap(x1Array,y1Array,x2Array,y2Array,xMax,yMax,inputCoordMap, puzzleBool) {
    let updatedCoordMap = new Array(yMax).fill(0).map(() => new Array(xMax).fill(0));
    for (let coord = 0; coord <= x1Array.length; coord++) {
        updatedCoordMap = getIndividualLineCoordinates(x1Array[coord], y1Array[coord], x2Array[coord], y2Array[coord],inputCoordMap, puzzleBool);
        inputCoordMap = [...updatedCoordMap];
    }
    return updatedCoordMap;
}

// Puzzle 1 Output:
const puzzle1CoordMap = getLatestCoordMap(x1Array,y1Array,x2Array,y2Array,xMax,yMax,coordMap1, false);
console.log('Puzzle 1: No. of points at which two lines overlap: ', puzzle1CoordMap.flat().filter(coord => coord >=2).length);

// Puzzle 2 Output:
const puzzle2CoordMap = getLatestCoordMap(x1Array,y1Array,x2Array,y2Array,xMax,yMax,coordMap2, true);
console.log('Puzzle 2: No. of points at which two lines overlap: ', puzzle2CoordMap.flat().filter(coord => coord >=2).length);