var express = require('express');
var router = express.Router();
var fs = require('fs');
// var path = require('path');
var jsonData = require('../jsonData.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', jsonData );
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express', repeat: 7, timestamp: new Date() });
});
router.get('/quotes', function(req, res) {
  res.send(jsonData);
});
router.post('/quotes', function(req, res) {
  jsonData.quotes.push(req.body.quote);
  fs.writeFile("jsonData.json", JSON.stringify(jsonData), function(err){
    if (err) {
      console.log(err);
      res.status(500).send("We could not save the quote, please try again later");
    }
    res.redirect("/quotes");
  });
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
