const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jade = require('jade');
const babel = require('jade-babel');

module.exports = (app) => {
  app.set('views', path.join(`${__dirname}/../`, 'views'));
  app.set('view engine', 'jade');

  jade.filters.babel = babel({});
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(`${__dirname}/../`, 'public')));
};
