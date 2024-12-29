import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  // Check if cookies exist and extract the token
  const token = req.cookies?.token; // Access 'token' property specifically
  //const { token } = req.cookies;
  console.log("Cookies received:", req.cookies);

  if (!token) {
    return res.status(401).json({
      error: "No token provided. Unauthorized access.",
    });
  }

  try {
    const decoded = verifyJWT(token); // Decodes the token and extracts user data
    req.user = { userId: decoded.userId, role: decoded.role }; // Attach user info to request
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token." });
  }
};

/*
try {
  // Verify the token
  const { userId, role } = verifyJWT(token);
  req.user = { userId: decoded.userId, role: decoded.role }; // Attach user info to request
  next(); // Proceed to the next middleware/route handler
} catch (error) {
  console.error("Token verification error:", error.message);
  return res.status(401).json({ error: "Invalid or expired token" });
}  */
