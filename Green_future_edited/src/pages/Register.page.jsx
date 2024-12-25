import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    password: "",
    role: "Employee",
    email: "",
    region: "",
    language: "English",
    country: "",
    department: "",
  });

  // Handle change for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData?.error || "Registration failed"}`);
        return;
      }

      const data = await response.json();
      alert(`User registered successfully! \n${JSON.stringify(data, null, 2)}`);

      // Reset form after successful submission
      setFormData({
        employee_id: "",
        full_name: "",
        password: "",
        role: "Employee",
        email: "",
        region: "",
        language: "English",
        country: "",
        department: "",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register Employee</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {/* Employee ID */}
        <div className="form-group">
          <label htmlFor="employee_id">Employee ID</label>
          <input
            type="number"
            name="employee_id"
            id="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
          />
        </div>

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
            <option value="Innovation Manager">Innovation Manager</option>
          </select>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Region */}
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <input
            type="text"
            name="region"
            id="region"
            value={formData.region}
            onChange={handleChange}
          />
        </div>

        {/* Language */}
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <input
            type="text"
            name="language"
            id="language"
            value={formData.language}
            onChange={handleChange}
          />
        </div>

        {/* Country */}
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* Department */}
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
