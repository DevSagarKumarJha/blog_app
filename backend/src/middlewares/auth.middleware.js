import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers?.Authorization?.split(" ")[1];
  req.user = null;

  console.log(`token: ${token}`);
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
// function checkForAuthentication(req, res, next) {
//   const token = req.headers?.authorization?.split(" ")[1];
//   req.user = null;

//   if (!token) return next();

//   try {
//     const user = getAuthUser(token);
//     req.user = user;
//   } catch (error) {
//     console.error("Error decoding token:", error);
//   }

//   return next();
// }