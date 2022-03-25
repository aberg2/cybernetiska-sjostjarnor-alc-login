var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('index.njk', { title: 'startsida' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin.njk', { title: 'signin' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup.njk', { title: 'signup' });
});

router.get('/content', function(req, res, next) {
  res.render('content.njk', { title: 'content' });
});



module.exports = router;
