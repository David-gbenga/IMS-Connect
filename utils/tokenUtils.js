import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

/*
import jwt from "jsonwebtoken";

// Function to create a JWT
export const createJWT = (payload) => {
  try {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      throw new Error(
        "JWT_SECRET or JWT_EXPIRES_IN is not defined in environment variables."
      );
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  } catch (error) {
    console.error("Error creating JWT:", error.message);
    throw new Error("Failed to create token.");
  }
};

// Function to verify a JWT
export const verifyJWT = (token) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    if (typeof token !== "string") {
      throw new TypeError("Token must be a valid string.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying JWT:", error.message);
    throw new Error("Invalid or expired token.");
  }
};   */
