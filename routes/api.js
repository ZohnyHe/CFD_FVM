var express = require('express');
var router = express.Router();
const path = require('path');
const { createTimeStepArrayFromDataFolder, readTemperatureArrayFromTimeFolder,
        readVelocityArrayFromTimeFolder, splitArrayInto3Dimension,
        readCellsNumberFromDataFolder, readPointsArrayFromConstFolder,
        readFacesArrayFromConstFolder, splitFacesArray,
        readOwnerArrayFromConstFolder, readNeighbourArrayFromConstFolder,
        createCellsArrayFromOwnerArrayAndNeighbourArray } = require('../src/readFilePath')

let srcFolderPath = './CFD_outputData/'
const { 
    Output_time, Output_cells_data, Cells_topo,
    OutputData, CellsData, OutputTime, OutputTemperature, OutputVelocity,
    PointsData, FacesData, OwnerData, NeighbourData, ConstData
            } = require('../models')


// find data by keying time step & cell index
// router.post('/datas/', express.json(), async(req, res) => {
//     const { TimeStep, CellsIndex } = req.body
//     console.log(TimeStep);
//     try {
//         const time = await OutputTime.findOne({ where: { timeStep: TimeStep }});
//         const cell = await OutputCellsIndex.findOne({ where: { cellsIndex: CellsIndex }});
//         const data = await OutputData.findAll({ 
//             where: { timeId: time.timeId, cellsId: cell.cellsId },
//             include: [{ model: OutputTime, as: 'time' }, { model: OutputCellsIndex, as: 'cells' },
//                         { model: OutputTemperature, as: 'temperature' }, { model: OutputVelocity, as: 'velocity'}]
//         })
//         return res.json(data)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: `Something went wrong`})
//     }
// })

// create all const data by keying case's name
router.post('/createConstData', express.json(), async(req, res) => {
    const { caseFolderName } = req.body
    let facesArray = readFacesArrayFromConstFolder(srcFolderPath, caseFolderName)
    let CellsNumber = readCellsNumberFromDataFolder(srcFolderPath, caseFolderName)
    let tempFaceArray = []
    let tempPointArray = []
    let keyword = /3\(/
    try {
        if (keyword.test(facesArray)) {
            console.log(`Cell's type: tetrahedron`);
            for(let cellIndex = 0; cellIndex < CellsNumber; cellIndex++) {
                const cell = await CellsData.findOne({ where: { cellsIndex: cellIndex.toFixed(0) } })
                tempFaceArray[0] = await FacesData.findOne({ where: { facesIndex: cell.cellsFirstFacesIndex }})
                tempFaceArray[1] = await FacesData.findOne({ where: { facesIndex: cell.cellsSecondFacesIndex }})
                tempFaceArray[2] = await FacesData.findOne({ where: { facesIndex: cell.cellsThridFacesIndex }})
                tempFaceArray[3] = await FacesData.findOne({ where: { facesIndex: cell.cellsFourthFacesIndex }})

                tempPointArray[0] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[0].facesFirstPointsIndex }})
                tempPointArray[1] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[0].facesSecondPointsIndex }})
                tempPointArray[2] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[0].facesThirdPointsIndex }})

                tempPointArray[3] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[1].facesFirstPointsIndex }})
                tempPointArray[4] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[1].facesSecondPointsIndex }})
                tempPointArray[5] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[1].facesThirdPointsIndex }})

                tempPointArray[6] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[2].facesFirstPointsIndex }})
                tempPointArray[7] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[2].facesSecondPointsIndex }})
                tempPointArray[8] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[2].facesThirdPointsIndex }})

                tempPointArray[9] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[3].facesFirstPointsIndex }})
                tempPointArray[10] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[3].facesSecondPointsIndex }})
                tempPointArray[11] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[3].facesThirdPointsIndex }})

                const constData_0 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[0].facesDataId, pointsDataId: tempPointArray[0].pointsDataId,                           
                })
                const constData_1 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[0].facesDataId, pointsDataId: tempPointArray[1].pointsDataId,                           
                })      
                const constData_2 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[0].facesDataId, pointsDataId: tempPointArray[2].pointsDataId,                           
                })  
                const constData_3 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[0].facesDataId, pointsDataId: tempPointArray[3].pointsDataId,                           
                })  
                const constData_4 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[1].facesDataId, pointsDataId: tempPointArray[4].pointsDataId,                           
                })  
                const constData_5 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[1].facesDataId, pointsDataId: tempPointArray[5].pointsDataId,                           
                })  
                const constData_6 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[1].facesDataId, pointsDataId: tempPointArray[6].pointsDataId,                           
                })  
                const constData_7 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[1].facesDataId, pointsDataId: tempPointArray[7].pointsDataId,                           
                })  
                const constData_8 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[2].facesDataId, pointsDataId: tempPointArray[8].pointsDataId,                           
                })  
                const constData_9 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[2].facesDataId, pointsDataId: tempPointArray[9].pointsDataId,                           
                })  
                const constData_10 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[2].facesDataId, pointsDataId: tempPointArray[10].pointsDataId,                           
                })  
                const constData_11 = await ConstData.create({
                    cellsId: cell.cellsId, facesDataId: tempFaceArray[2].facesDataId, pointsDataId: tempPointArray[11].pointsDataId,                           
                })                           
            }
        return res.json({ message: `Insert complete! Cell's type: tetrahedron` })
        } else {
            console.log(`Cell's type: hexahedron`);
            for(let cellIndex = 0; cellIndex < CellsNumber; cellIndex++) {
                    const cell = await CellsData.findOne({ where: { cellsIndex: cellIndex.toFixed(0) } })
                    tempFaceArray[0] = await FacesData.findOne({ where: { facesIndex: cell.cellsFirstFacesIndex }})
                    tempFaceArray[1] = await FacesData.findOne({ where: { facesIndex: cell.cellsSecondFacesIndex }})
                    tempFaceArray[2] = await FacesData.findOne({ where: { facesIndex: cell.cellsThridFacesIndex }})
                    tempFaceArray[3] = await FacesData.findOne({ where: { facesIndex: cell.cellsFourthFacesIndex }})
                    tempFaceArray[4] = await FacesData.findOne({ where: { facesIndex: cell.cellsFifthFacesIndex }})
                    tempFaceArray[5] = await FacesData.findOne({ where: { facesIndex: cell.cellsSixthFacesIndex }})

                    tempPointArray[0] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[0].facesFirstPointsIndex }})
                    tempPointArray[1] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[0].facesSecondPointsIndex }})
                    tempPointArray[2] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[0].facesThirdPointsIndex }})
                    tempPointArray[3] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[0].facesFourthPointsIndex }})

                    tempPointArray[4] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[1].facesFirstPointsIndex }})
                    tempPointArray[5] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[1].facesSecondPointsIndex }})
                    tempPointArray[6] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[1].facesThirdPointsIndex }})
                    tempPointArray[7] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[1].facesFourthPointsIndex }})

                    tempPointArray[8] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[2].facesFirstPointsIndex }})
                    tempPointArray[9] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[2].facesSecondPointsIndex }})
                    tempPointArray[10] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[2].facesThirdPointsIndex }})
                    tempPointArray[11] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[2].facesFourthPointsIndex }})

                    tempPointArray[12] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[3].facesFirstPointsIndex }})
                    tempPointArray[13] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[3].facesSecondPointsIndex }})
                    tempPointArray[14] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[3].facesThirdPointsIndex }})
                    tempPointArray[15] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[3].facesFourthPointsIndex }})

                    tempPointArray[16] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[4].facesFirstPointsIndex }})
                    tempPointArray[17] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[4].facesSecondPointsIndex }})
                    tempPointArray[18] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[4].facesThirdPointsIndex }})
                    tempPointArray[19] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[4].facesFourthPointsIndex }})

                    tempPointArray[20] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[5].facesFirstPointsIndex }})
                    tempPointArray[21] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[5].facesSecondPointsIndex }})
                    tempPointArray[22] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[5].facesThirdPointsIndex }})
                    tempPointArray[23] = await PointsData.findOne({ where: { pointsIndex: tempFaceArray[5].facesFourthPointsIndex }})

                    const constData_0 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[0].facesDataId, pointsDataId: tempPointArray[0].pointsDataId,                           
                    })
                    const constData_1 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[0].facesDataId, pointsDataId: tempPointArray[1].pointsDataId,                           
                    })      
                    const constData_2 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[0].facesDataId, pointsDataId: tempPointArray[2].pointsDataId,                           
                    })  
                    const constData_3 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[0].facesDataId, pointsDataId: tempPointArray[3].pointsDataId,                           
                    })  
                    const constData_4 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[1].facesDataId, pointsDataId: tempPointArray[4].pointsDataId,                           
                    })  
                    const constData_5 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[1].facesDataId, pointsDataId: tempPointArray[5].pointsDataId,                           
                    })  
                    const constData_6 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[1].facesDataId, pointsDataId: tempPointArray[6].pointsDataId,                           
                    })  
                    const constData_7 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[1].facesDataId, pointsDataId: tempPointArray[7].pointsDataId,                           
                    })  
                    const constData_8 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[2].facesDataId, pointsDataId: tempPointArray[8].pointsDataId,                           
                    })  
                    const constData_9 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[2].facesDataId, pointsDataId: tempPointArray[9].pointsDataId,                           
                    })  
                    const constData_10 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[2].facesDataId, pointsDataId: tempPointArray[10].pointsDataId,                           
                    })  
                    const constData_11 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[2].facesDataId, pointsDataId: tempPointArray[11].pointsDataId,                           
                    })  
                    const constData_12 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[3].facesDataId, pointsDataId: tempPointArray[12].pointsDataId,                           
                    })  
                    const constData_13 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[3].facesDataId, pointsDataId: tempPointArray[13].pointsDataId,                           
                    })  
                    const constData_14 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[3].facesDataId, pointsDataId: tempPointArray[14].pointsDataId,                           
                    })  
                    const constData_15 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[3].facesDataId, pointsDataId: tempPointArray[15].pointsDataId,                           
                    })  
                    const constData_16 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[4].facesDataId, pointsDataId: tempPointArray[16].pointsDataId,                           
                    })  
                    const constData_17 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[4].facesDataId, pointsDataId: tempPointArray[17].pointsDataId,                           
                    })  
                    const constData_18 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[4].facesDataId, pointsDataId: tempPointArray[18].pointsDataId,                           
                    })  
                    const constData_19 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[4].facesDataId, pointsDataId: tempPointArray[19].pointsDataId,                           
                    })  
                    const constData_20 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[5].facesDataId, pointsDataId: tempPointArray[20].pointsDataId,                           
                    })  
                    const constData_21 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[5].facesDataId, pointsDataId: tempPointArray[21].pointsDataId,                           
                    })  
                    const constData_22 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[5].facesDataId, pointsDataId: tempPointArray[22].pointsDataId,                           
                    })  
                    const constData_23 = await ConstData.create({
                        cellsId: cell.cellsId, facesDataId: tempFaceArray[5].facesDataId, pointsDataId: tempPointArray[23].pointsDataId,                           
                    })                                   
                }
            }
        return res.json({ message: `Insert complete! Cell's type: hexahedron` })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

// create all const data by keying case's name
router.post('/createConstDataPointsAndFaces', express.json(), async(req, res) => {
    const { caseFolderName } = req.body
    let facesArray = readFacesArrayFromConstFolder(srcFolderPath, caseFolderName)
    let keyword = /3\(/
    try {
        if (keyword.test(facesArray)) {
            for(let i = 0; i < facesArray.length; i++) {
                const faces = await FacesData.findOne({ where: { facesIndex: i.toFixed(0) } })
                const point_1 = await PointsData.findOne({ where: { pointsIndex: faces.facesFirstPointsIndex }})
                const point_2 = await PointsData.findOne({ where: { pointsIndex: faces.facesSecondPointsIndex }})
                const point_3 = await PointsData.findOne({ where: { pointsIndex: faces.facesThirdPointsIndex }})
                const constData_1 = await ConstData.create({
                    facesDataId: faces.facesDataId, pointsDataId: point_1.pointsDataId,                           
                })
                const constData_2 = await ConstData.create({
                    facesDataId: faces.facesDataId, pointsDataId: point_2.pointsDataId,                           
                })
                const constData_3 = await ConstData.create({
                    facesDataId: faces.facesDataId, pointsDataId: point_3.pointsDataId,                           
                })
            }
        return res.json({ message: `Insert complete!` })
        } else {
            for(let i = 0; i < facesArray.length; i++) {
                const faces = await FacesData.findOne({ where: { facesIndex: i.toFixed(0) } })
                const point_1 = await PointsData.findOne({ where: { pointsIndex: faces.facesFirstPointsIndex }})
                const point_2 = await PointsData.findOne({ where: { pointsIndex: faces.facesSecondPointsIndex }})
                const point_3 = await PointsData.findOne({ where: { pointsIndex: faces.facesThirdPointsIndex }})
                const point_4 = await PointsData.findOne({ where: { pointsIndex: faces.facesFourthPointsIndex }})               
                const constData_1 = await ConstData.create({
                    facesDataId: faces.facesDataId, pointsDataId: point_1.pointsDataId,                           
                })
                const constData_2 = await ConstData.create({
                    facesDataId: faces.facesDataId, pointsDataId: point_2.pointsDataId,                           
                })
                const constData_3 = await ConstData.create({
                    facesDataId: faces.facesDataId, pointsDataId: point_3.pointsDataId,                           
                })
                const constData_4 = await ConstData.create({
                    facesDataId: faces.facesDataId, pointsDataId: point_4.pointsDataId,                           
                })                                          
            }
        }
        return res.json({ message: `Insert complete!` })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


// create all const data by keying case's name
// router.post('/createAllConstData', express.json(), async(req, res) => {
//     const { caseFolderName } = req.body
//     let pointsArray = readPointsArrayFromConstFolder(srcFolderPath, caseFolderName)
//     let pointsXYZarray = splitArrayInto3Dimension(pointsArray)
//     let facesArray = readFacesArrayFromConstFolder(srcFolderPath, caseFolderName)
//     let facesSplitArray = splitFacesArray(facesArray)
//     let keyword = /3\(/
//     let ownerArray = readOwnerArrayFromConstFolder(srcFolderPath, caseFolderName)
//     let neighbourArray = readNeighbourArrayFromConstFolder(srcFolderPath, caseFolderName)
//     try {
//         if (keyword.test(facesArray)) {
//             for(let i = 0; i < facesSplitArray.index_1.length; i++) {
//                 const faces = await FacesData.create({ facesIndex: i, facesFirstPointsIndex: facesSplitArray.index_1[i], 
//                     facesSecondPointsIndex: facesSplitArray.index_2[i], facesThirdPointsIndex: facesSplitArray.index_3[i] })
//                 for(let j = 0; j < pointsArray.length; j++) {
//                     const points = await PointsData.create({ pointsIndex: j, pointsXcoordinate: pointsXYZarray.dimension_1[j], 
//                         pointsYcoordinate: pointsXYZarray.dimension_2[j], pointsZcoordinate: pointsXYZarray.dimension_3[j] })
//                     for(let k = 0; k < ownerArray.length; k++) {
//                         const owner = await OwnerData.create({ externalFacesIndex: k, 
//                             cellsIndexExternalFacesBelongsTo: ownerArray[k] })
//                         for(let n = 0; n < neighbourArray.length; n++) {
//                             const neighbour = await NeighbourData.create({ internalFacesIndex: n, 
//                                 cellsIndexInternalFacesBelongsTo: neighbourArray[n] })
//                             const constData = await ConstData.create({
//                             pointsDataId: points.pointsDataId, facesDataId: faces.facesDataId,
//                             ownerDataId: owner.ownerDataId, neighbourDataId: neighbour.neighbourDataId
//                             })
//                             console.log(constData)
//                         }
//                     }
//                 }
//             }
//         return res.json({ message: `Insert complete!` })
//         } else {
//             for(let i = 0; i < facesSplitArray.index_1.length; i++) {
//                 const faces = await FacesData.create({ facesIndex: i, facesFirstPointsIndex: facesSplitArray.index_1[i], 
//                     facesSecondPointsIndex: facesSplitArray.index_2[i], facesThirdPointsIndex: facesSplitArray.index_3[i],
//                     facesFourthPointsIndex: facesSplitArray.index_4[i] })
//                 for(let j = 0; j < pointsArray.length; j++) {
//                     const points = await PointsData.create({ pointsIndex: j, pointsXcoordinate: pointsXYZarray.dimension_1[j], 
//                         pointsYcoordinate: pointsXYZarray.dimension_2[j], pointsZcoordinate: pointsXYZarray.dimension_3[j] })
//                     for(let k = 0; k < ownerArray.length; k++) {
//                         const owner = await OwnerData.create({ externalFacesIndex: k, 
//                             cellsIndexExternalFacesBelongsTo: ownerArray[k] })
//                         for(let n = 0; n < neighbourArray.length; n++) {
//                             const neighbour = await NeighbourData.create({ internalFacesIndex: n, 
//                                 cellsIndexInternalFacesBelongsTo: neighbourArray[n] })
//                             const constData = await ConstData.create({
//                             pointsDataId: points.pointsDataId, facesDataId: faces.facesDataId,
//                             ownerDataId: owner.ownerDataId, neighbourDataId: neighbour.neighbourDataId
//                             })
//                             console.log(constData)
//                         }
//                     }
//                 }
//             }
//         }
//         return res.json({ message: `Insert complete!` })
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })


// create all time steps and cell index by keying case's name
router.post('/createTimeAndCells', express.json(), async(req, res) => {
    const { caseFolderName } = req.body
    let TimeStepArray = createTimeStepArrayFromDataFolder(srcFolderPath, caseFolderName)
    let CellsNumber = readCellsNumberFromDataFolder(srcFolderPath, caseFolderName)
    try {
        TimeStepArray.forEach(timeStep => {
            OutputTime.create({ timeStep: timeStep })
        })
        for(let i = 0; i < CellsNumber; i++) {
            await CellsData.create({ cellsIndex: i })
        }
        return res.json({ message: `Insert complete!` })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


// create all cell's output data by keying case's name
router.post('/createAllOutputData', express.json(), async(req, res) => {
    const { caseFolderName } = req.body
    let TimeStepArray = createTimeStepArrayFromDataFolder(srcFolderPath, caseFolderName)
    try {
        for(let i = 0; i < TimeStepArray.length; i++) {
            let CellsNumber = readCellsNumberFromDataFolder(srcFolderPath, caseFolderName)
            let tempTemperaturePath = path.join(srcFolderPath, caseFolderName, TimeStepArray[i], 'T')
            let temperatureArray = readTemperatureArrayFromTimeFolder(tempTemperaturePath)
            let tempVelocityPath = path.join(srcFolderPath, caseFolderName, TimeStepArray[i], 'U')
            let velocityArray = readVelocityArrayFromTimeFolder(tempVelocityPath)
            let velocityXYZarray = splitArrayInto3Dimension(velocityArray)
            for(let j = 0; j < CellsNumber; j++) {
                const time = await OutputTime.findOne({ where: { timeStep: TimeStepArray[i] }})
                const cell = await CellsData.findOne({ where: { cellsIndex: j.toFixed(0) }})
                const data_T = await OutputTemperature.create({
                    temperatureKelvin: temperatureArray[j], temperatureCelsius: temperatureArray[j] - 273.15
                }) 
                const data_U = await OutputVelocity.create({
                    velocityX: velocityXYZarray.dimension_1[j], velocityY: velocityXYZarray.dimension_2[j], velocityZ: velocityXYZarray.dimension_3[j]
                })
                const outputData = await OutputData.create({
                    cellsId: cell.cellsId, timeId: time.timeId, temperatureId: data_T.temperatureId, velocityId: data_U.velocityId
                })
            }
        }   
        return res.json({ message: `Insert complete!` })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


// 
router.post('/createPoints', express.json(), async(req, res) => {
    const { caseFolderName } = req.body
    let pointsArray = readPointsArrayFromConstFolder(srcFolderPath, caseFolderName)
    let pointsXYZarray = splitArrayInto3Dimension(pointsArray)
    try {
        for(let i = 0; i < pointsArray.length; i++) {
                const points = await PointsData.create({ pointsIndex: i, pointsXcoordinate: pointsXYZarray.dimension_1[i], 
                    pointsYcoordinate: pointsXYZarray.dimension_2[i], pointsZcoordinate: pointsXYZarray.dimension_3[i] })
            }
        return res.json({ message: `Insert complete!` })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


// 
router.post('/createFaces', express.json(), async(req, res) => {
    const { caseFolderName } = req.body
    let facesArray = readFacesArrayFromConstFolder(srcFolderPath, caseFolderName)
    let facesSplitArray = splitFacesArray(facesArray)
    let keyword = /3\(/
    try {
        if (keyword.test(facesArray)) {
            for(let i = 0; i < facesArray.length; i++) {
                const faces = await FacesData.create({ facesIndex: i, facesFirstPointsIndex: facesSplitArray.index_1[i], 
                    facesSecondPointsIndex: facesSplitArray.index_2[i], facesThirdPointsIndex: facesSplitArray.index_3[i] })
            }
        return res.json({ message: `Insert complete!` })
        } else {
            for(let i = 0; i < facesArray.length; i++) {
                const faces = await FacesData.create({ facesIndex: i, facesFirstPointsIndex: facesSplitArray.index_1[i], 
                    facesSecondPointsIndex: facesSplitArray.index_2[i], facesThirdPointsIndex: facesSplitArray.index_3[i],
                    facesFourthPointsIndex: facesSplitArray.index_4[i] })
            }
        return res.json({ message: `Insert complete!` })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


// 
router.post('/createOwner', express.json(), async(req, res) => {
    const { caseFolderName } = req.body
    let ownerArray = readOwnerArrayFromConstFolder(srcFolderPath, caseFolderName)
    try {
        for(let i = 0; i < ownerArray.length; i++) {
                const owner = await OwnerData.create({ externalFacesIndex: i, 
                    cellsIndexExternalFacesBelongsTo: ownerArray[i] })
            }
        return res.json({ message: `Insert complete!` })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


// 
router.post('/createNeighbour', express.json(), async(req, res) => {
    const { caseFolderName } = req.body
    let neighbourArray = readNeighbourArrayFromConstFolder(srcFolderPath, caseFolderName)
    try {
        for(let i = 0; i < neighbourArray.length; i++) {
                const neighbour = await NeighbourData.create({ internalFacesIndex: i, 
                    cellsIndexInternalFacesBelongsTo: neighbourArray[i] })
            }
        return res.json({ message: `Insert complete!` })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


router.post('/createCells', express.json(), async(req, res) => {
    const { caseFolderName } = req.body
    let ownerArray = readOwnerArrayFromConstFolder(srcFolderPath, caseFolderName)
    let neighbourArray = readNeighbourArrayFromConstFolder(srcFolderPath, caseFolderName)
    let cellsArray = createCellsArrayFromOwnerArrayAndNeighbourArray(ownerArray, neighbourArray)
    let facesNumber = cellsArray[0].length
    try {
        if (facesNumber = 6) {
            for(let CellsIndex = 0; CellsIndex < cellsArray.length; CellsIndex++) {
                const cells = await CellsData.create({ cellsIndex: CellsIndex, 
                    cellsFirstFacesIndex: cellsArray[CellsIndex][0], cellsSecondFacesIndex: cellsArray[CellsIndex][1],
                    cellsThridFacesIndex: cellsArray[CellsIndex][2], cellsFourthFacesIndex: cellsArray[CellsIndex][3],
                    cellsFifthFacesIndex: cellsArray[CellsIndex][4], cellsSixthFacesIndex: cellsArray[CellsIndex][5] 
                })
            }
        } else {
            for(let CellsIndex = 0; CellsIndex < cellsArray.length; CellsIndex++) {
                const cells = await CellsData.create({ cellsIndex: CellsIndex, 
                    cellsFirstFacesIndex: cellsArray[CellsIndex][0], cellsSecondFacesIndex: cellsArray[CellsIndex][1],
                    cellsThridFacesIndex: cellsArray[CellsIndex][2], cellsFourthFacesIndex: cellsArray[CellsIndex][3]
                })
            }
        }    
        return res.json({ message: `Insert complete!` })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


// delete time step by keying time's UUID
router.delete('/deleteTime/:TimeId', async(req, res) => {
    const TimeId = req.params.TimeId
    try {
        const Time = await Output_time.findOne({ where: { TimeId: TimeId }})
        await Time.destroy()
        return res.json({ message: "Time_step deleted!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})


// undate time step by keying time's UUID
router.put('/updateTime/:TimeId', express.json(), async(req, res) => {
    const TimeId = req.params.TimeId
    const { Time_step } = req.body
    try {
        const Time = await Output_time.findOne({ where: { TimeId: TimeId }})
        Time.Time_step = Time_step
        await Time.save()
        return res.json(Time_step)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})


router.post('/form', function(req, res, next) {
    console.log(req.body);
    res.render('three', { x: Number(req.body.x), y: Number(req.body.y), z: Number(req.body.z), cam_dist: Number(req.body.cam_dist)});
    // res.redirect('/page/three', { x: Number(req.body.x), y: Number(req.body.y), z: Number(req.body.z), cam_dist: Number(req.body.cam_dist)});
});

// post FK example
// router.post('/create', express.json(), async(req, res) => {
//     const { TimeId, Cell_index, T, Ux, Uy, Uz } = req.body
//     try {
//         const time = await Output_time.findOne({ where: { TimeId: TimeId }})
//         const data = await Output_cells_data.create({ Cell_index, T, Ux, Uy, Uz, TimeId: time.TimeId })
//         return res.json(data)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })


// create single time step manually
// router.post('/timeTestSingular', express.json(), async(req, res) => {
//     const  { Time_step } = req.body
//     try {
//         const Time = await Output_time.create({ Time_step })
//         return res.json(Time)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })


// insert all velocity data into database
// router.post('/insertVelocity', express.json(), async(req, res) => {
//     const { caseFolderName } = req.body
//     let TimeStepArray = createTimeStepArrayFromDataFolder(srcFolderPath, caseFolderName)
//     try {
//         for (let i = 0; i < TimeStepArray.length; i++) {
//             let tempVelocityPath = path.join(srcFolderPath, caseFolderName, TimeStepArray[i], 'U')
//             let velocityArray = readVelocityArrayFromTimeFolder(tempVelocityPath)
//             let velocityXYZarray = splitVelocityArrayIntoXYZdirection(velocityArray)
//             const time = await Output_time.findOne({ where: { Time_step: TimeStepArray[i] }})
//             for (let j = 0; j < velocityXYZarray.velocity_X.length; j++) {
//                 const data = await Output_cells_data.create({ 
//                     Ux: velocityXYZarray.velocity_X[j],  Uy: velocityXYZarray.velocity_Y[j], 
//                     Uz: velocityXYZarray.velocity_Z[j], TimeId: time.TimeId })
//             }
//         }
//         return res.json({ message: `Insert complete!` })
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })


// insert all temperature data into time steps
// router.post('/insertTemperature', express.json(), async(req, res) => {
//     const { caseFolderName } = req.body
//     let TimeStepArray = createTimeStepArrayFromDataFolder(srcFolderPath, caseFolderName)
//     try {
//         for(let i = 0; i < TimeStepArray.length; i++) {
//             let CellsNumber = createCellsArrayFromDataFolder(srcFolderPath, caseFolderName)
//             let tempTemperaturePath = path.join(srcFolderPath, caseFolderName, TimeStepArray[i], 'T')
//             let temparetureArray = readTemperatureArrayFromTimeFolder(tempTemperaturePath)
//             for(let j = 0; j < CellsNumber; j++) {
//                 const time = await Output_time.findOne({ where: { Time_step: TimeStepArray[i] }})
//                 const cell = await Cells_topo.findOne({ where: { Cell_index: j.toFixed(0) }})
//                 const data = await Output_cells_data.create({ T: temparetureArray[j], CellId: cell.CellId, TimeId: time.TimeId })
//                 // console.log(data)
//             }
//         }   
//         return res.json({ message: `Insert complete!` })
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })

module.exports = router;