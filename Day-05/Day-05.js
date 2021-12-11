// Read input and organize into required coordinate arrays:
const fs = require("fs");
const input = fs.readFileSync("./testInput.txt", "utf-8");
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
const coordMap = new Array(yMax).fill(0).map(() => new Array(xMax).fill(0));

// Get max value from an array:
function getMaxOfArray(arr) {
    return arr.reduce((accumulator, element) => {
         return Math.max(accumulator, element);
     });
 }
 
 // Generate coordinates between end points: 
 function getIndividualLineCoordinates(x1,y1,x2,y2,coordMapToUpdate) {
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
     } else if(Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
         let xSrcIndex = x1;
         let xDestIndex = x2;
         let ySrcIndex = y1;
         let yDestIndex = y2;

         while(xSrcIndex != xDestIndex && ySrcIndex != yDestIndex) {
            if (ySrcIndex <= yDestIndex) {
                if (xSrcIndex <= xDestIndex) {
                    coordMapToUpdate[ySrcIndex][xSrcIndex] === 0 ? coordMapToUpdate[ySrcIndex][xSrcIndex] = 1 : coordMapToUpdate[ySrcIndex][xSrcIndex]++;
                    xSrcIndex++;
                } else if (xSrcIndex >= xDestIndex) {
                    coordMapToUpdate[ySrcIndex][xSrcIndex] === 0 ? coordMapToUpdate[ySrcIndex][xSrcIndex] = 1 : coordMapToUpdate[ySrcIndex][xSrcIndex]++;
                    xSrcIndex--;
                }
                ySrcIndex++;
            } else if (ySrcIndex >= yDestIndex) {
                if (xSrcIndex <= xDestIndex) {
                    coordMapToUpdate[ySrcIndex][xSrcIndex] === 0 ? coordMapToUpdate[ySrcIndex][xSrcIndex] = 1 : coordMapToUpdate[ySrcIndex][xSrcIndex]++;
                    xSrcIndex++;
                } else if (xSrcIndex >= xDestIndex) {
                    coordMapToUpdate[ySrcIndex][xSrcIndex] === 0 ? coordMapToUpdate[ySrcIndex][xSrcIndex] = 1 : coordMapToUpdate[ySrcIndex][xSrcIndex]++;
                    xSrcIndex--;
                }
                ySrcIndex--;
            }
        }
     }
     return coordMapToUpdate;
 }

 // Update overall coordinate map:
 function getLatestCoordMap(x1Array,y1Array,x2Array,y2Array,xMax,yMax,inputCoordMap) {
    let updatedCoordMap = new Array(yMax).fill(0).map(() => new Array(xMax).fill(0));
    for (let coord = 0; coord <= x1Array.length; coord++) {
        updatedCoordMap = getIndividualLineCoordinates(x1Array[coord], y1Array[coord], x2Array[coord], y2Array[coord],inputCoordMap);
        inputCoordMap = [...updatedCoordMap];
    }
    
    return updatedCoordMap;
}

// const noOfPointsWhere2OrLargerOverlap = getLatestCoordMap(x1Array,y1Array,x2Array,y2Array,xMax,yMax,coordMap);
const coordMapWithVents = getLatestCoordMap(x1Array,y1Array,x2Array,y2Array,xMax,yMax,coordMap);
console.log('No. of points: ', coordMapWithVents.flat().filter(coord => coord >=2).length);



