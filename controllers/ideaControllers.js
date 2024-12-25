import idea from "../models/ideaModels.js";
// getIdea, createtIdea, updateIdea, deleteIdea,
import { StatusCodes } from "http-status-codes";

//Get an Idea
export const getIdea = async (req, res) => {
  try {
    const one_idea = await idea.find({});
    res.status(StatusCodes.OK).json({ one_idea });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error finding idea", details: error.message });
  }
};

//Create Staff
export const createtIdea = async (req, res) => {
  try {
    const ideaData = await idea.create(req.body);
    await ideaData.save(); // Save to MongoDB
    res.status(StatusCodes.CREATED).json({ ideaData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error creating idea", details: error.message });
  }
};

/*Get an idea 
export const getIdea = async (req, res) => {
  const { id } = req.params;
  const one_idea = await idea.findById(id);
  console.log(one_idea);
  if (!one_idea) {
    return res.status(404).json({ msg: `no idea with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ one_idea });
}; */

//UPDATE idea

export const updateIdea = async (req, res) => {
  const { id } = req.params;
  const upidea = await idea.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!upidea) {
    return res.status(404).json({ msg: `no idea with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ msg: "info modified", upidea });
};

//DELETE idea
export const deleteIdea = async (req, res) => {
  //define and find
  const { id } = req.params;
  const delIdea = await idea.findByIdAndDelete(id);
  if (!delIdea) {
    return res.status(404).json({ msg: `no idea with id ${id}` });
  }

  res.status(200).json({ msg: "idea deleted", task: delIdea });
};
