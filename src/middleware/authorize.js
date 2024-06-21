module.exports = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

module.exports.onlySelf = () => {
  return (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.clienteId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
