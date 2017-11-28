function Authentication() {

}

Authentication.prototype.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(500).json({ message: '로그인 후 이용가능합니다.' });
};


module.exports = new Authentication();
