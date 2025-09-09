module.exports = function (roles = []) {
  // roles can be a single role string or array
  if (typeof roles === "string") roles = [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ msg: "Forbidden - insufficient role" });
    next();
  };
};
