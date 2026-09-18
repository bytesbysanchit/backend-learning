const authorize = (allowedRole) => {
  return (req, res, next) => {
    if(req.user.role=== allowedRole){
      next();
    }
    else{
      res.status(403).json({
        message: 'Access denied'
      });
    }
  }
};

module.exports = authorize;