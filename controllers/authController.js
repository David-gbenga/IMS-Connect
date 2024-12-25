import User from "../models/authModel.js";
import bcrypt from "bcryptjs";

// login as a user by ID
export const login = async (req, res) => {
  try {
    const { employee_id, password } = req.body;

    // 1. Check if employee_id and password are provided
    if (!employee_id || !password) {
      return res.status(400).json({
        error: "Please provide both employee_id and password.",
      });
    }

    // 2. Find user by employee_id
    const user = await User.findOne({ employee_id });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // 3. Compare hashed password in the database with the plaintext password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // 4. If authentication succeeds, respond with user info or a token
    res.status(200).json({
      message: "Login successful",
      user, // In production, you might exclude 'user.password' or respond with a JWT
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  }
};
// CREATE a new user
export const register = async (req, res) => {
  try {
    const {
      employee_id,
      full_name,
      password,
      role,
      email,
      region,
      language,
      country,
      department,
    } = req.body;
    // a random value that is added to the password before hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // You might want to validate data here or hash password, etc.
    const newUser = await User.create(req.body);

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Failed to create user",
      details: error.message,
    });
  }
};
