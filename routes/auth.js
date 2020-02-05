module.exports =  {
  required: (req, res, next) => {
    if (req.isAuthenticated())
      return next();
    if (req.body.ajax)
      return res.send("Unauthorized");
    res.redirect('/');
  },
  optional: (req, res, next) => {
    if (req.isAuthenticated())
      return next();
    return next("Warning: Unauthorized");
  }
}