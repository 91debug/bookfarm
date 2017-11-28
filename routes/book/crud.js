const express = require('express');

const router = express.Router();
const Book = require('../../model/book');

router.post('/', (req, res) => {
  const params = req.body.book;

  // user 대입
  params.user = req.user;

  // book 생성
  const newBook = new Book(params);
  newBook.save((err) => {
    if (err) {
      return res.json(err);
    }
    return res.json(newBook);
  });
});

router.get('/', (req, res, next) => {
  next();
});

router.get('/:pk', (req, res) => {
  const bookPk = req.params.pk;
  Book
    .findOne({ _id: bookPk })
    .exec((err, book) => {
      if (err) {
        return res.json(err);
      }
      return res.json(book);
    });
});

router.patch('/:pk', (req, res, next) => {
  next();
});

router.delete('/:pk', (req, res, next) => {
  next();
});

module.exports = router;
