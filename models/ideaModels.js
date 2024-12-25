import mongoose from "mongoose";
//idea,ideaCategory,  language
const IdeaSchema = new mongoose.Schema(
  {
    idea: {
      type: String,
      required: true,
      trim: true, // Removes whitespace at the start and end
    },
    ideaCategory: {
      type: String,
      enum: [
        "Renewable Energy",
        "Eco-Friendly Urban Development",
        "Environmental Policies",
      ],
      required: true,
    },
    language: {
      type: String,
      default: "English", // Provide a sensible default if desired
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Idea", IdeaSchema);
