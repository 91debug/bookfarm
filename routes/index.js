const express = require('express');
const passport = require('passport');
const http = require('http');
const https = require('https');
const Authentication = require('../utils/authentication');

const apn = require('apn');

const router = express.Router();

router.use('/api/users', require('./user/crud'));
router.use('/api/books', require('./book/crud'));
router.use('/api/sells', require('./sell/crud'));

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('index', { title: '북팜' });
  }
  return res.redirect('/login');
});
router.get('/auth', (req, res) => {
  const id = req.query.id;
  const pw = req.query.pw;
  const options = {
    hostname: 'portal.nsu.ac.kr',
    port: 443,
    path: '/',
    method: 'GET',
  };
  https.get({
    host: 'portal.nsu.ac.kr',
    path: '/nsusite/index.aspx',
  }, function (response) {
    // Continuously update stream with data
    let body = '';
    response.on('data', function (d) {
      body += d;
    });
    response.on('end', function () {

      // Data reception is done, do whatever with it!
      console.log(body);
    });
  });
});
router.get('/join', (req, res) => {
  const id = req.query.id;
  const token = req.query.token;

  if (typeof id !== 'undefined') {
    return res.render('join', { title: '회원가입', id, token });
  }
  return res.render('login', { title: '로그인' });
});
router.get('/login', (req, res) => res.render('login', { title: '로그인' }));
router.get('/sell', (req, res) => res.render('sell', { title: '판매등록' }));
router.get('/mysell', (req, res) => res.render('mysell', { title: '판매 진행중 목록' }));
router.get('/mynosell', (req, res) => res.render('mynosell', { title: '판매 진행중 목록' }));
router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (user, info) => {
    if (user === null) {
      return res.status(500).json({ message: '아이디 또는 비밀번호를 다시 확인해주세요.' });
    }

    req.session.authUser = user;
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({
        message: 'login ok',
        user: {
          _id: user._id,
        },
      });
    });
  })(req, res, next);
});



module.exports = router;
