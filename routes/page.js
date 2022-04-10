// 統一放 GET 請求的頁面
var express = require('express');
var router = express.Router();

const { sequelize, Output_time, Cells_topo } = require('../models')

// router.get('url 路徑', 回調函數)
// 收到 /page/__ 的 GET 請求時，以 render 的方法回應渲染頁面
router.get('/', function(req, res, next) {
  res.render('index', {title: "HELL"});
});

router.get('/three', function(req, res, next) {
  res.render('three', { x: 1, y: 1, z: 1, cam_dist: 10, title: "Three.js test", message: "Defaulttt"});  
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.get('/time', async(req, res) => {
    try {
        const time = await Output_time.findAll()
        return res.json(time)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong`})
    }
})

router.get('/cell', async(req, res) => {
  try {
      const cells = await Cells_topo.findAll()
      return res.json(cells)
  } catch (err) {
      console.log(err)
      return res.status(500).json({ error: `Something went wrong`})
  }
})

module.exports = router;