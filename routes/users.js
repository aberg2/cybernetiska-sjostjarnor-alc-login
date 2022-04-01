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

router.post('/signin', async function (req, res, next) {
  const name = req.body.name
  const password = req.body.password
  await pool
  .promise()
  .query("SELECT password FROM users WHERE name = ?", [name])
  .then(([rows]) => {
    console.log(rows[0].password);
   bcrypt.compare(password, rows[0].password, function (err, result) {
      console.log(result)
      if (result) {
      req.session.name = name;
      req.session.loggedin = true;
      console.log(req.session.name);


      //return res.json(req.session)
      return res.redirect('/users/content');
  
      } else {
        res.render('signin.njk', { title: 'signin', error: 'Wrong username or password' });
      }
    });
  })
  .catch((err) => {
    res.render('signin.njk', { title: 'signin', error: 'Wrong username or password' });

    console.log(err);
  });
  });

router.post('/signup', function (req, res, next) {
  const name = req.body.name
  const password = req.body.password
  if (name.length < 4) {
    res.send("Username is to short");
  } else if (password.length < 4) {
    res.send("PAssword to weAk");
  }




  bcrypt.hash(password, 10, async function (err, hash) {
    console.log(hash)
    await pool
      .promise()
      .query("INSERT INTO users (name,password) VALUES (?,?)", [name, hash])
      .then((response) => {
        res.redirect('/users/signup');
        console.log(response);
      })
      .catch((err) => {
        console.log(err);

      });
  });
});

router.get('/content', function (req, res, next) {
  console.log(req.session);
  if (req.session.loggedin) {
    res.render('content.njk', { title: 'content' , name: req.session.name});
  } else {
  //  res.json(req.session);
    res.redirect('/users/signin');
  }
});



module.exports = router;
