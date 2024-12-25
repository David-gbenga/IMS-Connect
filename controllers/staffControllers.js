import Staff_table from "../models/staffModel.js";
import { StatusCodes } from "http-status-codes";

//Get All Staff
export const getAllStaff = async (req, res) => {
  try {
    const all_staff = await Staff_table.find({});
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
    const StaffData = await Staff_table.create(req.body);
    await StaffData.save(); // Save to MongoDB
    res.status(StatusCodes.CREATED).json({ StaffData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error creating staff", details: error.message });
  }
};

//Get Single staff
export const getStaff = async (req, res) => {
  const { id } = req.params;
  const staff1 = await Staff_table.findById(id);
  console.log(staff1);
  if (!staff1) {
    return res.status(404).json({ msg: `no staff with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ staff1 });
};

//UPDATE Staff

export const updateStaff = async (req, res) => {
  const { id } = req.params;
  const staff2 = await Staff_table.findByIdAndUpdate(id, req.body, {
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
  const staff3 = await Staff_table.findByIdAndDelete(id);
  if (!staff3) {
    return res.status(404).json({ msg: `no staff with id ${id}` });
  }

  res.status(200).json({ msg: "staff deleted", task: staff3 });
};
