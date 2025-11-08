const jwt = require("jsonwebtoken");

const protect = (roles = []) => {
  return (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Include name, role, and id in req.user
      req.user = {
        id: decoded.id,
        role: decoded.role,
        name: decoded.name || "User",
      };

      // Check role access if roles array provided
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token invalid" });
    }
  };
};

module.exports = protect;
