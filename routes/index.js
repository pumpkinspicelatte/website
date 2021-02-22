const express = require('express');
const router = express.Router();

const title = 'Pumpkin Spice Latte';
const description = `Pumpkin Spice Latte - The Programming Language!
Learn to code through an easy to use coding language
that is lightweight and platform independent.`;

const local = '';
const { js, css } = require('../utils/inject').jsCSS();
const keywords = 'Top 10, Top Ten, Top Ten Programming Languages, Top 10 Programming Languages, Pumpkin Spice Latte, Programming Language, Programming, Language, Girls who code, Email, Pumpkin, Spice, Latte, PSL, Pumpkin Spice Latte Co, Coding, Computer Science, Computational, Computers';

const api = local;
const obj = { api, title, description, js, css, keywords };

router.get('/', (req, res, next) => {
  obj.host = req.headers.host;
  obj.pre = obj.host.indexOf('localhost') !== -1 ? 'http://' : 'https://';
  res.render('index', obj);
});

module.exports = router;
