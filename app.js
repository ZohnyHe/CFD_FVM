var express = require('express');
var app = express()
var cookieParser = require('cookie-parser');
app.use(cookieParser());
// var logger = require('morgan');
// app.use(logger('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( {extended: true }));
// app.use(bodyParser.json());
var createError = require('http-errors');
var path = require('path');
var routes = require('./routes');
var router = require('./routes/page');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/page', routes.page)
app.use('/api', routes.api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});


const { sequelize } = require('./models')
const { OutputTime, OutputData, CellsData, OutputTemperature, OutputVelocity,
        PointsData, FacesData, OwnerData, NeighbourData, ConstData } = require('./models');
const Sequelize = require('sequelize');


router.get('/getPoint/', async(req, res) => {
    const PointsIndex = req.query.pointsIndex
    try {
        const point = await PointsData.findOne({ where: { pointsIndex: PointsIndex } })
        const data = await ConstData.findAll({ 
            where: { pointsDataId: point.pointsDataId }
        })
        return res.json(point)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})


router.get('/getFace/', async(req, res) => {
    const FacesIndex = req.query.facesIndex
    try {
        const face = await FacesData.findOne({ where: { facesIndex: FacesIndex } })
        const point_1 = await PointsData.findOne({ where: { pointsIndex: face.facesFirstPointsIndex }})
        const point_2 = await PointsData.findOne({ where: { pointsIndex: face.facesSecondPointsIndex }})
        const point_3 = await PointsData.findOne({ where: { pointsIndex: face.facesThirdPointsIndex }})
        const point_4 = await PointsData.findOne({ where: { pointsIndex: face.facesFourthPointsIndex }})
        const data = await ConstData.findAll({ 
            where: { facesDataId: face.facesDataId, pointsDataId: {[Sequelize.Op.or]: [point_1.pointsDataId, point_2.pointsDataId, point_3.pointsDataId, point_4.pointsDataId]} },
            include: { model: PointsData, as: 'point' }
            // include: [{ model: FacesData, as: 'faces' }, { model: PointsData, as: 'point' }]
        })
        return res.json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})


router.get('/getCell/', async(req, res) => {
    const CellsIndex = req.query.cellsIndex
    try {
        const cell = await CellsData.findOne({ where: { cellsIndex: CellsIndex } })

        const face_1 = await FacesData.findOne({ where: { facesIndex: cell.cellsFirstFacesIndex }})
        const face_2 = await FacesData.findOne({ where: { facesIndex: cell.cellsSecondFacesIndex }})
        const face_3 = await FacesData.findOne({ where: { facesIndex: cell.cellsThridFacesIndex }})
        const face_4 = await FacesData.findOne({ where: { facesIndex: cell.cellsFourthFacesIndex }})
        const face_5 = await FacesData.findOne({ where: { facesIndex: cell.cellsFifthFacesIndex }})
        const face_6 = await FacesData.findOne({ where: { facesIndex: cell.cellsSixthFacesIndex }})

        const point_1 = await PointsData.findOne({ where: { pointsIndex: face_1.facesFirstPointsIndex }})
        const point_2 = await PointsData.findOne({ where: { pointsIndex: face_1.facesSecondPointsIndex }})
        const point_3 = await PointsData.findOne({ where: { pointsIndex: face_1.facesThirdPointsIndex }})
        const point_4 = await PointsData.findOne({ where: { pointsIndex: face_1.facesFourthPointsIndex }})
        const point_5 = await PointsData.findOne({ where: { pointsIndex: face_1.facesFourthPointsIndex }})
        const point_6 = await PointsData.findOne({ where: { pointsIndex: face_1.facesFourthPointsIndex }})

        const data = await ConstData.findAll({ 
            where: { cellsId: cell.cellsId, facesDataId: {[Sequelize.Op.or]: [face_1.facesDataId, face_2.facesDataId, face_3.facesDataId,
                                                                                        face_4.facesDataId, face_5.facesDataId, face_6.facesDataId]} },
            // include: [{ model: FacesData, as: 'faces' }]
            include: [{ model: CellsData, as: 'cellsConst' }, { model: FacesData, as: 'faces' }, { model: PointsData, as: 'point' }]
            // include: [{ model: FacesData, as: 'faces' }, { model: PointsData, as: 'point' }]
        })
        return res.json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})


router.get('/getPointsConstData/', async(req, res) => {
    try {
        const points = await PointsData.findAll()
        return res.json(points)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

router.get('/getFacesConstData/', async(req, res) => {
    try {
        const faces = await FacesData.findAll()
        return res.json(faces)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

router.get('/getOwnersConstData/', async(req, res) => {
    try {
        const owners = await OwnerData.findAll()
        return res.json(owners)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

router.get('/getNeighboursConstData/', async(req, res) => {
    try {
        const neighbours = await NeighbourData.findAll()
        return res.json(neighbours)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

router.get('/getCellsConstData/', async(req, res) => {
    try {
        const neighbours = await CellsData.findAll()
        return res.json(neighbours)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

router.get('/getCellsData/', async(req, res) => {
    const CellsIndex = req.query.cellsIndex
    try {
        const cell = await ConstData.findAll({
            where: { cellsIndexExternalFacesBelongsTo: CellsIndex },
            include: [{ model: OutputTime, as: 'time' }, { model: CellsData, as: 'cells' },
                        { model: OutputTemperature, as: 'temperature' }, { model: OutputVelocity, as: 'velocity'}]
        })
        return res.json(cell)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

router.get('/getDataByTimeStepAndCellsIndex/', async(req, res) => {
    const TimeStep = req.query.TimeStep
    const CellsIndex = req.query.CellsIndex
    try {
        const time = await OutputTime.findOne({ where: { timeStep: TimeStep }});
        const cell = await CellsData.findOne({ where: { cellsIndex: CellsIndex }});
        const data = await OutputData.findAll({ 
            where: { timeId: time.timeId, cellsId: cell.cellsId },
            include: [{ model: OutputTime, as: 'time' }, { model: CellsData, as: 'cells' },
                        { model: OutputTemperature, as: 'temperature' }, { model: OutputVelocity, as: 'velocity'}]
        })
        return res.json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

router.get('/getDataByTimeId/:timeId', async(req, res) => {
    const TimeId = req.params.timeId
    try {
        const time = await OutputTime.findOne({ where: { timeId: TimeId }});
        const data = await OutputData.findAll({ 
            where: { timeId: time.timeId },
            include: [{ model: OutputTime, as: 'time' }, { model: CellsData, as: 'cells' },
                        { model: OutputTemperature, as: 'temperature' }, { model: OutputVelocity, as: 'velocity'}]
        })
        return res.json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

router.get('/getDataByTimeStep/:timeStep', async(req, res) => {
    const TimeStep = req.params.timeStep
    try {
        const time = await OutputTime.findOne({ where: { timeStep: TimeStep }});
        const data = await OutputData.findAll({ 
            where: { timeId: time.timeId },
            include: [{ model: OutputTime, as: 'time' }, { model: CellsData, as: 'cells' },
                        { model: OutputTemperature, as: 'temperature' }, { model: OutputVelocity, as: 'velocity'}]
        })
        return res.json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

// router.get('/three', function(req, res, next) {
//     console.log(`HI`);
//     res.render('three', { x: 1, y: 1, z: 1, cam_dist: 10, title: "Three.js test", message: "Defaultttt"});  
//     });

app.listen({ port: 5000 }, async () => {
    console.log(`Server up on http://localhost:5000`)
    await sequelize.authenticate()
    // await sequelize.sync({ force: true })
    console.log(`Database connected!`)
})

module.exports = app;