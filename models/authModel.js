import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    employee_id: {
      type: Number,
      required: true,
      unique: true, // Consider making this unique if each employee_id is distinct
    },
    full_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Employee", "Admin", "Innovation Manager"],
      default: "Employee", // or you can make this required
    },
    email: {
      type: String,
      required: true,
      unique: true, // If each user must have a unique email
    },
    region: {
      type: String,
    },
    language: {
      type: String,
      default: "English", // Provide a sensible default if desired
    },
    country: {
      type: String,
    },
    department: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.model("User", UserSchema);
