const fs = require('fs');
const path = require('path');

// for test, will come from req.body
let caseFolderName = 'case_03'
let srcFolderPath = './CFD_outputData/'


function createTimeStepArrayFromDataFolder (srcFolderPath, caseFolderName) {
    let dataPath = path.join(srcFolderPath , caseFolderName)
    let content = []
    let regexForEnglish = /[a-z]/
    let pathFiles = fs.readdirSync (dataPath, {encoding:'utf8', flag:'r'})
    console.log(`Start reading time step from: ${dataPath}`)
    pathFiles.forEach(file => {
        let tempPath = path.join(dataPath, file)
        let stats = fs.statSync(tempPath);
        if (stats.isDirectory() && file !== '0' && regexForEnglish.test(file) == false) {
            content.push(file)
            content.sort(function(a, b) {
                return a - b;
            })
        }
    })
    return timeStepArray = content
}


function readCellsNumberFromDataFolder (srcFolderPath, caseFolderName) {
    let dataPath = path.join(srcFolderPath , caseFolderName, 'constant', 'polyMesh', 'owner')
    let content = []
    content = fs.readFileSync (dataPath, {encoding:'utf8', flag:'r'})
    let regex_1 = /nCells:.+/
    let regex_2 = /nCells:/
    let regex_3 = /\s./
    console.log(`Start reading cell's topology from: ${dataPath}`)
    let capturedResult = content.toString().match(regex_1)[0]
    let trimmedResult = capturedResult.replace(regex_2,'').split(regex_3);    
    return cellsNumber = trimmedResult[0]
}


function readTemperatureArrayFromTimeFolder (temperaturePath) {
    let temperatureContent = [];
    temperatureContent = fs.readFileSync (temperaturePath, {encoding:'utf8', flag:'r'})
    let fileKeyword_1 = /volScalarField/
    let fileKeyword_2 = /T\;/
    if (fileKeyword_1.test(temperatureContent) === true && fileKeyword_2.test(temperatureContent) === true) {
        console.log(`File's formate check OK`);
        console.log(`Start analyse temperature file from: ${temperaturePath}`);
        let regex_1 = /\((\n.+)+/  // capture (\n...\n...)\n; of data
        let regex_2 = /\(/      // capture ( of data
        let regex_3 = /\)\n;/   // capture )\n; of data
        let CapturedResult = temperatureContent.toString().match(regex_1)[0]
        let TrimmedResult = CapturedResult.replace(regex_2,'').replace(regex_3,'').split('\n');
        TrimmedResult.shift();
        TrimmedResult.pop();
        
        console.log(`--------------------------------------`);
        console.log(`totally have ${TrimmedResult.length} records of T data.\n`);
        console.log(`* Please check that:`);
        console.log(`The first record is ${TrimmedResult[0]}`);
        console.log(`The last record is ${TrimmedResult[TrimmedResult.length-1]}`);
        console.log(`--------------------------------------`); 

        return temperatureArray = TrimmedResult;
        
    } else {
        console.log(`File is not T`);
    };
}


function readVelocityArrayFromTimeFolder (velocityPath) {
    let velocityContent = [];
    velocityContent = fs.readFileSync (velocityPath, {encoding:'utf8', flag:'r'})
    let fileKeyword_1 = /volVectorField/
    let fileKeyword_2 = /U\;/
    if (fileKeyword_1.test(velocityContent) === true && fileKeyword_2.test(velocityContent) === true) {
        console.log(`File's formate check OK`);
        console.log(`Start analyse velocity file from: ${velocityPath}`);
        let regex_1 = /\((\n.+)+/  // capture (\n...\n...)\n; of data
        let regex_2 = /\(/      // capture ( of data
        let regex_3 = /\)\n;/   // capture )\n; of data

        let CapturedResult = velocityContent.toString().match(regex_1)[0]
        let TrimmedResult = CapturedResult.replace(regex_2,'x').replace(regex_3,'y').split('\n');
        TrimmedResult.shift();
        TrimmedResult.pop();
        
        console.log(`--------------------------------------`);
        console.log(`totally have ${TrimmedResult.length} records of U data.\n`);
        console.log(`* Please check that:`);
        console.log(`The first record is ${TrimmedResult[0]}`);
        console.log(`The last record is ${TrimmedResult[TrimmedResult.length-1]}`);
        console.log(`--------------------------------------`); 

        return velocityArray = TrimmedResult;
        
    } else {
        console.log(`File is not U`);
    };
}


function splitArrayInto3Dimension (originArray) {
    let dimension_1 = []
    let dimension_2 = []
    let dimension_3 = []
    for (let i = 0; i < originArray.length; i++) {
        let tempArray = originArray[i]
        let tempString = tempArray.toString();
        let splitResult = tempString.replace(/\s/g,',').replace(/\(/g,'').replace(/\)/g,'').split(/\,/)
        dimension_1.push(splitResult[0])
        dimension_2.push(splitResult[1])
        dimension_3.push(splitResult[2])
    }
    return { dimension_1, dimension_2, dimension_3 }
}


function readPointsArrayFromConstFolder (srcFolderPath, caseFolderName) {
    let dataPath = path.join(srcFolderPath , caseFolderName, 'constant', 'polyMesh', 'points')
    let content = [];
    content = fs.readFileSync (dataPath, {encoding:'utf8', flag:'r'})
    let fileKeyword_1 = /vectorField/
    let fileKeyword_2 = /points\;/
    if (fileKeyword_1.test(content) === true && fileKeyword_2.test(content) === true) {
        console.log(`File's formate check OK`);
        console.log(`Start reading points file from: ${dataPath}`);
        let regex_1 = /\((\n.+)+/  // capture (\n...\n...)\n; of data
        let regex_2 = /\(/      // capture ( of data
        let regex_3 = /\)\n;/   // capture )\n; of data

        let CapturedResult = content.toString().match(regex_1)[0]
        let TrimmedResult = CapturedResult.replace(regex_2,'x').replace(regex_3,'y').split('\n');
        TrimmedResult.shift();
        TrimmedResult.pop();
        
        console.log(`--------------------------------------`);
        console.log(`totally have ${TrimmedResult.length} records of points data.\n`);
        console.log(`* Please check that:`);
        console.log(`The first record is ${TrimmedResult[0]}`);
        console.log(`The last record is ${TrimmedResult[TrimmedResult.length-1]}`);
        console.log(`--------------------------------------`); 

        return pointsArray = TrimmedResult;
        
    } else {
        console.log(`File is not points`);
    };
}


function readFacesArrayFromConstFolder (srcFolderPath, caseFolderName) {
    let dataPath = path.join(srcFolderPath , caseFolderName, 'constant', 'polyMesh', 'faces')
    let content = [];
    content = fs.readFileSync (dataPath, {encoding:'utf8', flag:'r'})
    let fileKeyword_1 = /faceList/
    let fileKeyword_2 = /faces\;/
    if (fileKeyword_1.test(content) === true && fileKeyword_2.test(content) === true) {
        console.log(`File's formate check OK`);
        console.log(`Start reading faces file from: ${dataPath}`);
        let regex_1 = /\((\n.+)+/  // capture (\n...\n...)\n; of data
        let regex_2 = /\(/      // capture ( of data
        let regex_3 = /\)\n;/   // capture )\n; of data
        let CapturedResult = content.toString().match(regex_1)[0]
        let TrimmedResult = CapturedResult.replace(regex_2,'').replace(regex_3,'').split('\n');
        TrimmedResult.shift();
        TrimmedResult.pop();
        
        console.log(`--------------------------------------`);
        console.log(`totally have ${TrimmedResult.length} records of faces data.\n`);
        console.log(`* Please check that:`);
        console.log(`The first record is ${TrimmedResult[0]}`);
        console.log(`The last record is ${TrimmedResult[TrimmedResult.length-1]}`);
        console.log(`--------------------------------------`); 

        return facesArray = TrimmedResult;
        
    } else {
        console.log(`File is not faces`);
    };
}


function splitFacesArray (originArray) {
    let keyword = /3\(/
    if (keyword.test(originArray)) {
        let index_1 = []
        let index_2 = []
        let index_3 = []
        for (let i = 0; i < originArray.length; i++) {
            let tempArray = originArray[i]
            let tempString = tempArray.toString();
            let splitResult = tempString.replace(/\s/g,',').replace(/\d\(/g,'').replace(/\)/g,'').split(/\,/)
            index_1.push(splitResult[0])
            index_2.push(splitResult[1])
            index_3.push(splitResult[2])
        }
        return { index_1, index_2, index_3 }
    } else {
        let index_1 = []
        let index_2 = []
        let index_3 = []
        let index_4 = []
        for (let i = 0; i < originArray.length; i++) {
            let tempArray = originArray[i]
            let tempString = tempArray.toString();
            let splitResult = tempString.replace(/\s/g,',').replace(/\d\(/g,'').replace(/\)/g,'').split(/\,/)
            index_1.push(splitResult[0])
            index_2.push(splitResult[1])
            index_3.push(splitResult[2])
            index_4.push(splitResult[3])
        }
        return { index_1, index_2, index_3, index_4 }
    }
}


function readOwnerArrayFromConstFolder (srcFolderPath, caseFolderName) {
    let dataPath = path.join(srcFolderPath , caseFolderName, 'constant', 'polyMesh', 'owner')
    let content = [];
    content = fs.readFileSync (dataPath, {encoding:'utf8', flag:'r'})
    let fileKeyword_1 = /labelList/
    let fileKeyword_2 = /owner\;/
    if (fileKeyword_1.test(content) === true && fileKeyword_2.test(content) === true) {
        console.log(`File's formate check OK`);
        console.log(`Start reading owner file from: ${dataPath}`);
        let regex_1 = /\((\n.+)+/  // capture (\n...\n...)\n; of data
        let regex_2 = /\(/      // capture ( of data
        let regex_3 = /\)\n;/   // capture )\n; of data
        let CapturedResult = content.toString().match(regex_1)[0]
        let TrimmedResult = CapturedResult.replace(regex_2,'').replace(regex_3,'').split('\n');
        TrimmedResult.shift();
        TrimmedResult.pop();
        
        console.log(`--------------------------------------`);
        console.log(`totally have ${TrimmedResult.length} records of owner data.\n`);
        console.log(`* Please check that:`);
        console.log(`The first record is ${TrimmedResult[0]}`);
        console.log(`The last record is ${TrimmedResult[TrimmedResult.length-1]}`);
        console.log(`--------------------------------------`); 

        return ownerArray = TrimmedResult;
        
    } else {
        console.log(`File is not owner`);
    };
}


function readNeighbourArrayFromConstFolder (srcFolderPath, caseFolderName) {
    let dataPath = path.join(srcFolderPath , caseFolderName, 'constant', 'polyMesh', 'neighbour')
    let content = [];
    content = fs.readFileSync (dataPath, {encoding:'utf8', flag:'r'})
    let fileKeyword_1 = /labelList/
    let fileKeyword_2 = /neighbour\;/
    if (fileKeyword_1.test(content) === true && fileKeyword_2.test(content) === true) {
        console.log(`File's formate check OK`);
        console.log(`Start reading neighbour file from: ${dataPath}`);
        let regex_1 = /\((\n.+)+/  // capture (\n...\n...)\n; of data
        let regex_2 = /\(/      // capture ( of data
        let regex_3 = /\)\n;/   // capture )\n; of data
        let CapturedResult = content.toString().match(regex_1)[0]
        let TrimmedResult = CapturedResult.replace(regex_2,'').replace(regex_3,'').split('\n');
        TrimmedResult.shift();
        TrimmedResult.pop();
        
        console.log(`--------------------------------------`);
        console.log(`totally have ${TrimmedResult.length} records of neighbour data.\n`);
        console.log(`* Please check that:`);
        console.log(`The first record is ${TrimmedResult[0]}`);
        console.log(`The last record is ${TrimmedResult[TrimmedResult.length-1]}`);
        console.log(`--------------------------------------`); 

        return neighbourArray = TrimmedResult;
        
    } else {
        console.log(`File is not neighbour`);
    };
}

function createCellsArrayFromOwnerArrayAndNeighbourArray (OwnerArray, NeighbourArray) {
    let cellsNumber = readCellsNumberFromDataFolder(srcFolderPath, caseFolderName)
    let cellsArray = []
    for(cellsIndex = 0; cellsIndex < cellsNumber; cellsIndex++) {
        let tempFacesArray = []
        for(facesIndex = 0; facesIndex < OwnerArray.length; facesIndex++){
            if(OwnerArray[facesIndex] == cellsIndex) {
                tempFacesArray.push(facesIndex)
            }
            if(NeighbourArray[facesIndex] == cellsIndex) {
                tempFacesArray.push(facesIndex)
            }
        }
        cellsArray.push(tempFacesArray)
    }
    return cellsArray
}




// function readPressureArrayFromTimeFolder (pressurePath) {
//     let pressureArray = [];
//     pressureArray = fs.readFileSync (pressurePath, {encoding:'utf8', flag:'r'})
//     let fileKeyword = /volScalarField/;
//     if (fileKeyword.test(pressureArray) === true) {
//         console.log(`File's formate check OK`);
//         console.log(`Start analyse pressure file from: ${pressurePath}`);
//         let regex_1 = /\((\n.+)+/  // capture (\n...\n...)\n; of data
//         let regex_2 = /\(/      // capture ( of data
//         let regex_3 = /\)\n;/   // capture )\n; of data
//         let CapturedResult = pressureArray.toString().match(regex_1)[0]
//         let TrimmedResult = CapturedResult.replace(regex_2,'').replace(regex_3,'').split('\n');
//         TrimmedResult.shift();
//         TrimmedResult.pop();
        
//         console.log(`--------------------------------------`);
//         console.log(`totally have ${TrimmedResult.length} records of p data.\n`);
//         console.log(`* Please check that:`);
//         console.log(`The first record is ${TrimmedResult[0]}`);
//         console.log(`The last record is ${TrimmedResult[TrimmedResult.length-1]}`);
//         console.log(`--------------------------------------`); 

//         return pressureArray = TrimmedResult;
        
//     } else {
//         console.log(`File is not p`);
//     };
// }



// let Path = path.join(srcFolderPath , caseFolderName, '2.5', 'T')
// let result = readOwnerArrayFromConstFolder(srcFolderPath , caseFolderName);
// aaa = splitFacesArray(result)
// console.log(result)

// let owner = readOwnerArrayFromConstFolder(srcFolderPath, caseFolderName)
// let NeighbourArray = readNeighbourArrayFromConstFolder (srcFolderPath, caseFolderName)
// let result = createCellsDataFromOwnerArrayAndNeighbourArray(owner, NeighbourArray)
// console.log(result);



module.exports = {createTimeStepArrayFromDataFolder, readCellsNumberFromDataFolder,
                    readTemperatureArrayFromTimeFolder, readVelocityArrayFromTimeFolder, 
                    splitArrayInto3Dimension, readPointsArrayFromConstFolder,
                    readFacesArrayFromConstFolder, readOwnerArrayFromConstFolder,
                    readNeighbourArrayFromConstFolder, splitFacesArray, createCellsArrayFromOwnerArrayAndNeighbourArray}