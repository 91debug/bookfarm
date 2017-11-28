
const express = require('express');

const app = express();

// config load
require('./configs/express')(app);
require('./configs/database')(app);
require('./configs/passport')(app);

app.use((req, res, next) => {
  res.locals = {
    user: req.user,
  };
  next();
});

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
