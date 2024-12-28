import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

// Logout as a user
router.get("/logout", logout);

// CREATE a new user
router.post("/register", validateRegisterInput, register);

// Login as a user
router.post("/login", validateLoginInput, login);

export default router;
