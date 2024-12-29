import React, { useEffect, useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: "0000",
    full_name: "Enter Full Name",
    password: "*****", // Added default password value
    role: "Employee",
    email: "Email Address",
    department: "Enter Department",
  });

  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  // Fetch all staff on component mount
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("/api/v1/admin");
        if (!response.ok) {
          throw new Error("Failed to fetch staff list");
        }
        const data = await response.json();
        setUsers(data.all_staff || []);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error creating staff");
      }
      const { data: newUser } = await response.json();
      setUsers((prev) => [...prev, newUser]);
      setFormData({
        employee_id: "",
        full_name: "",
        password: "",
        role: "Employee",
        email: "",
        department: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Edit an existing user
  const handleEditClick = (user) => {
    setEditMode(true);
    setEditUserId(user._id);
    setFormData({
      employee_id: user.employee_id || "",
      full_name: user.full_name || "",
      password: "", // Password field must be re-entered for updates
      role: user.role || "Employee",
      email: user.email || "",
      department: user.department || "",
    });
  };

  // Update a user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/admin/${editUserId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error updating staff");
      }
      const { staff2: updatedUser } = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user._id === editUserId ? updatedUser : user))
      );
      setEditMode(false);
      setEditUserId(null);
      setFormData({
        employee_id: "",
        full_name: "",
        password: "",
        role: "Employee",
        email: "",
        department: "",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/v1/admin/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting staff");
      }
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <form onSubmit={editMode ? handleUpdateUser : handleCreateUser}>
        <input
          type="number"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          required
          placeholder="Employee ID"
        />
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
          placeholder="Full Name"
        />
        <input
          type="password" // Ensures secure password input
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
          <option value="Innovation Manager">Innovation Manager</option>
        </select>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email Address"
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <button type="submit">{editMode ? "Update" : "Create"}</button>
      </form>
      <table>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.employee_id}</td>
            <td>{user.full_name}</td>
            <td>{user.role}</td>
            <td>{user.email}</td>
            <td>{user.department}</td>
            <td>
              <button onClick={() => handleEditClick(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AdminPage;
