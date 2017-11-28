const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const User = require('../../model/user');

const router = express.Router();

function isAlreadyUser(req, res, next) {
  const params = req.body;
  User
    .findOne({ studentId: params.studentId })
    .exec((err, user) => {
      if (user) {
        return res.status(500).json({ message: '이미 가입된 학번입니다.' });
      }
      return next();
    });
}
router.post('/', isAlreadyUser, (req, res) => {
  const params = req.body;
  const newUser = new User(params);
  console.log(params);
  newUser.password = bcrypt.hashSync(newUser.password);
  newUser.save((err, user) => {
    if (err) {
      return res.status(500).json({ message: '예기치 못한 오류' });
    }
    req.newUser = user;
    return res.json({ message: '가입완료' });
  });
});

router.get('/', (req, res, next) => {
  next();
});

router.get('/:pk', (req, res, next) => {
  next();
});

router.patch('/:pk', (req, res, next) => {
  next();
});

router.delete('/:pk', (req, res, next) => {
  next();
});

module.exports = router;
