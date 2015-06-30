var express = require('express');
var router = express.Router();
var jsonData = require('../jsonData.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', repeat: 7, timestamp: new Date() });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express', repeat: 7, timestamp: new Date() });
});
router.get('/data/:id', function(req, res) {
  res.send(jsonData.quotes[req.params.id-1]);
});
router.post('/data', function(req, res) {
  res.send("Posted!\n");
});
router.get('/data', function(req, res) {
  res.send("got it!\n");
});

module.exports = router;
