const express = require('express');
const apn = require('apn');

const router = express.Router();
const Sell = require('../../model/sell');

router.post('/', (req, res) => {
  const params = req.body;

  // user 대입
  params.user = req.user;
  params.state = 'SELLING';

  // sell 생성
  const newSell = new Sell(params);
  newSell.save((err) => {
    if (err) {
      return res.json(err);
    }
    return res.json(newSell);
  });
});

router.get('/', (req, res) => {
  const page = parseInt(req.query.page, 0);
  const searchKeyword = req.query.searchKeyword;
  const searchType = req.query.searchType;
  const options = {
    sort: '-createdTime',
    page,
    limit: 5,
    populate: [
      { path: 'user' },
      { path: 'buyer' },
    ],
  };
  const searchQuery = {};

  if (req.query.state) {
    searchQuery.user = req.user;
    searchQuery.state = req.query.state;
  }

  if (typeof searchKeyword !== 'undefined' && typeof searchType !== 'undefined') {
    searchQuery['book.' + searchType] = { $regex: searchKeyword };
  }

  Sell
  .paginate(searchQuery, options)
  .then(sells => res.json(sells));
});

router.get('/:pk', (req, res, next) => {
  next();
});

router.patch('/:pk', (req, res) => {
  const pk = req.params.pk;
  const params = req.body;

  if (!req.isAuthenticated()) {
    return res.status(500).json({});
  }

  if (params.state === 'TRADING') {
    params.buyer = req.user;
  }

  Sell
  .findOne({ _id: pk })
  .populate('user')
  .exec((err, sell) => {
    if (err) {
      return res.status(500).json({});
    }
    sell.state = params.state;
    if (params.state === 'TRADING') {
      sell.buyer = req.user;
    }
    sell.save((saveErr, saveSell) => {
      if (saveErr) {
        return res.status(500).json({});
      }
      return res.json({ state: saveSell });
    });
  });
});

router.delete('/:pk', (req, res) => {
  const pk = req.params.pk;
  Sell
    .findOneAndRemove({
      _id: pk,
      user: req.user._id,
    }, (err) => {
      if (err) {
        throw err;
      }
      return res.json({ message: '삭제 완료' });
    });
});

module.exports = router;
