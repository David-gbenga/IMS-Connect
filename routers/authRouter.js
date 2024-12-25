import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

// CREATE a new user
router.post("/register", validateRegisterInput, register);

// CREATE a new user
router.post("/login", validateLoginInput, login);

export default router;
