//import Staff_table from "../models/staffModel.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/authModel.js";
import bcrypt from "bcryptjs";

//Get All Staff
export const getAllStaff = async (req, res) => {
  try {
    const all_staff = await User.find({});
    res.status(StatusCodes.OK).json({ all_staff });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error finding all staff", details: error.message });
  }
};

//Create Staff
export const createStaff = async (req, res) => {
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

//Get Single staff
export const getStaff = async (req, res) => {
  const { id } = req.params;
  const staff1 = await User.findById(id);
  console.log(staff1);
  if (!staff1) {
    return res.status(404).json({ msg: `no staff with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ staff1 });
};

//UPDATE Staff

export const updateStaff = async (req, res) => {
  const { id } = req.params;
  const staff2 = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!staff2) {
    return res.status(404).json({ msg: `no staff with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ msg: "info modified", staff2 });
};

//DELETE STAFF
export const deleteStaff = async (req, res) => {
  //define and find
  const { id } = req.params;
  const staff3 = await User.findByIdAndDelete(id);
  if (!staff3) {
    return res.status(404).json({ msg: `no staff with id ${id}` });
  }

  res.status(200).json({ msg: "staff deleted", task: staff3 });
};
