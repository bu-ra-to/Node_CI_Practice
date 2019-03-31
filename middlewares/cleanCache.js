const { clearCache } = require('../services/cache');

module.exports = async (req, res, next) => {
  clearCache(req.user.id);
  next();
};
