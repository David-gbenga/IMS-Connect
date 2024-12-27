import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      error: "No token provided. Unauthorized access.",
    });
  }

  try {
    const { userId, role } = verifyJWT(token); //userId
    req.user = { userId, role };
    next();
  } catch (error) {
    return res.status(401).json({ error: "authentication invalid" });
  }
};
