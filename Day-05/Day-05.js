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
})

function getMaxOfArray(arr) {
    return arr.reduce((accumulator, element) => {
         return Math.max(accumulator, element);
     });
 }
 
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
     }
     return coordMapToUpdate;
 }

 function getLatestCoordMap(x1Array,y1Array,x2Array,y2Array,xMax,yMax,inputCoordMap) {
    let updatedCoordMap = new Array(yMax).fill(0).map(() => new Array(xMax).fill(0));
    for (let yCoord = 0; yCoord <= yMax; yCoord++) {
        for (let xCoord = 0; xCoord <= xMax; xCoord++) {
            updatedCoordMap = getIndividualLineCoordinates(x1Array[xCoord], y1Array[yCoord], x2Array[xCoord], y2Array[yCoord],inputCoordMap);
            inputCoordMap = [...updatedCoordMap];
        }
    }
    return updatedCoordMap;
}

const xMax = getMaxOfArray([...x1Array,...x2Array]);
const yMax = getMaxOfArray([...y1Array,...y2Array]);
const coordMap = new Array(yMax).fill(0).map(() => new Array(xMax).fill(0));

const noOfPointsWhere2OrLargerOverlap = getLatestCoordMap(x1Array,y1Array,x2Array,y2Array,xMax,yMax,coordMap).filter(coord => coord >=2).length;
console.log('No. of points: ', noOfPointsWhere2OrLargerOverlap);



