var express = require('express');
var router = express.Router();
var fs = require('fs');
// var path = require('path');
var jsonData = require('../jsonData.json');

var persistData = function(callbacks) {
   fs.writeFile("jsonData.json", JSON.stringify(jsonData), function(err){
      if (err) {
        console.log(err);
        callbacks.error();
      }
      callbacks.success();
    });
};


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
    res.status(400).send("Error: write something new");
    return;
  }
  jsonData.quotes.push(req.body.quote);
  persistData({
    success: function() {
     //on success
     res.json({ quote: newQuote });
    },
    error: function() {
     //on error
     res.status(500).json( { error: "We could not save the quote, please try again later" } );
  }});
});
router.delete('/quotes/:id', function(req, res) {
  var id = req.params.id,
      spliced = jsonData.quotes.splice(id, 1);
  if (spliced === 0) {
    res.status(404).send("Error: quote doesn't exist");
    return;
  }
  persistData({
    success: function() {
      res.json({message: "quote deleted", deletedIdx: id});
    },
    error: function() {
      res.status(400).json({message: "quote was not deleted"});
  }});
});
router.put('/quotes/:id', function(req, res) {
  var id = req.params.id;
  if (id > jsonData.quotes.length-1) {
    res.status(404).json({error: "Error: quote doesn't exist"});
    return;
  }
  jsonData.quotes = req.body.quote;
  persistData({
    success: function() {
      res.json({message: "quote deleted"});
    },
    error: function() {
      res.status(400).json({message: "quote was not delete"});
  }});
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
