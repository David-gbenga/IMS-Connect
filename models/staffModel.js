import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    employee_id: { type: Number, required: true }, // Add `required` if necessary
    full_name: { type: String, required: true }, // Use camelCase
    role: {
      type: String,
      enum: ["Employee", "Innovation Manager", "Admin"],
      default: "Employee",
    },
    email: { type: String, required: true, unique: true }, // `unique` ensures no duplicate emails
    region: {
      type: String,
      enum: ["Europe", "North America", "Asia", "South Africa", "Africa"],
      default: "Europe",
    },
    password: {
      type: String,
      required: true,
    },
    language: { type: String, default: "English" }, // Add a default language if needed
    country: { type: String, required: true }, // Add `required` if necessary
    department: { type: String, required: true }, // Add `required` if necessary
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

export default mongoose.model("Staff_table", StaffSchema);

// employee_id,Full_name, email,language, country,department
