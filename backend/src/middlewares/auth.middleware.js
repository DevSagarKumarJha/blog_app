import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains { id: userId }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authenticate;
