var express = require('express');
var router = express.Router();
var passport = require('passport');
var Article = require('../models/article');

router.get('/', function(req, res, next){
  res.render('articles/index', {title: 'Article Management'});
});





module.exports = router;
