const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.njk')
}).get('/register', (req, res) => {
  res.render('register.njk')
}).get('/home', (req, res) => {
  res.render('home.njk')
})

module.exports = router;