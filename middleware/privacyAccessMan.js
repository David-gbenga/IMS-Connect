import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import User from "../models/authModel.js";

export const ensureAdminFromDB = async (req, res, next) => {
  try {
    // 2. Fetch the user from the database by ID
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 3. Check role
    if (user.role !== "Admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    // If we pass all checks, proceed
    next();
  } catch (error) {
    console.error("Error checking admin in DB:", error);
    res.status(500).json({
      error: "An error occurred while verifying admin status",
      details: error.message,
    });
  }
};

/*
export const adminCheck = (req, res, next) => {
  try {
    // Assuming `req.user.role` is set by a previous authentication middleware
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        error: "Forbidden: Admins only",
      });
    }

    // If role is Admin, proceed
    next();
  } catch (error) {
    console.error("Error checking admin role:", error);
    return res.status(500).json({
      error: "An error occurred while checking admin permissions.",
      details: error.message,
    });
  }
}; */
