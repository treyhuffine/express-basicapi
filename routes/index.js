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
  res.json(jsonData);
});
router.post('/quotes', function(req, res) {
  var newQuote = req.body.quote;
  if (!newQuote || jsonData.quotes.indexOf(newQuote) > -1) {
    res.status(400).send("We need a text for that quote, son");
    return;
  }
  jsonData.quotes.push(req.body.quote);
  fs.writeFile("jsonData.json", JSON.stringify(jsonData), function(err){
    if (err) {
      console.log(err);
      res.status(500).send("We could not save the quote, please try again later");
    }
    res.json({quote: newQuote});
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
