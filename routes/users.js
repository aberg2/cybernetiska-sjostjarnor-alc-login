var express = require('express');
var router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

/* GET users listing. */

router.get('/', function (req, res, next) {
  res.render('index.njk', { title: 'startsida' });
});

router.get('/signin', function (req, res, next) {
  res.render('signin.njk', { title: 'signin' });
});
router.get('/signup', function (req, res, next) {
  res.render('signup.njk', { title: 'signup' });
});

router.post('/signup', function (req, res, next) {
  const name = req.body.name
  const password = req.body.password

  bcrypt.hash(password, 10, async function (err, hash) {
    console.log(hash)
    await pool
      .promise()
      .query("INSERT INTO users (name,password) VALUES (?,?)", [name, hash])
      .then((response) => {
        console.log(response);

      })
      .catch((err) => {
        console.log(err);

      });
  });
});

router.get('/content', function (req, res, next) {
  res.render('content.njk', { title: 'content' });
});



module.exports = router;
