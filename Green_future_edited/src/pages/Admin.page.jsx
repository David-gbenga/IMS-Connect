import React, { useEffect, useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    role: "Employee", // or 'Admin', 'Innovation Manager'
    email: "",
    department: "",
    approved: false, // Whether the user can submit ideas
  });

  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  // 1. Fetch all users on component mount
  useEffect(() => {
    // Fetch your user list from the backend
    // Example:
    // fetch("/api/v1/users")
    //   .then((res) => res.json())
    //   .then((data) => setUsers(data))
    //   .catch((error) => console.error("Error fetching users:", error));

    // For now, we’ll simulate with some placeholder data:
    setUsers([
      {
        _id: "1",
        employee_id: 100,
        full_name: "John Doe",
        role: "Employee",
        email: "john@example.com",
        department: "Engineering",
        approved: true,
      },
      {
        _id: "2",
        employee_id: 101,
        full_name: "Jane Smith",
        role: "Admin",
        email: "jane@example.com",
        department: "HR",
        approved: false,
      },
    ]);
  }, []);

  // 2. Handle input changes for both creating and editing users
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 3. Create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    // Example POST request
    // const response = await fetch("/api/v1/users", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // const data = await response.json();

    // For now, we just simulate adding to local state
    const newUser = {
      _id: Date.now().toString(),
      ...formData,
    };
    setUsers([...users, newUser]);

    // Reset form
    setFormData({
      employee_id: "",
      full_name: "",
      role: "Employee",
      email: "",
      department: "",
      approved: false,
    });
  };

  // 4. Select a user to edit
  const handleEditClick = (user) => {
    setEditMode(true);
    setEditUserId(user._id);
    setFormData({
      employee_id: user.employee_id,
      full_name: user.full_name,
      role: user.role,
      email: user.email,
      department: user.department,
      approved: user.approved,
    });
  };

  // 5. Update user details
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    // Example PATCH request:
    // await fetch(`/api/v1/users/${editUserId}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    // Simulate local state update
    setUsers((prev) =>
      prev.map((user) =>
        user._id === editUserId ? { ...user, ...formData } : user
      )
    );
    setEditMode(false);
    setEditUserId(null);

    // Reset form
    setFormData({
      employee_id: "",
      full_name: "",
      role: "Employee",
      email: "",
      department: "",
      approved: false,
    });
  };

  // 6. Delete a user
  const handleDeleteUser = async (userId) => {
    // Example DELETE request:
    // await fetch(`/api/v1/users/${userId}`, { method: "DELETE" });

    // Simulate local state removal
    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  // 7. Toggle "approved" for employees to submit ideas
  const handleApproveClick = async (userId) => {
    // Example PATCH:
    // await fetch(`/api/v1/users/${userId}/approve`, { method: "PATCH" });
    // Or handle it manually with body

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, approved: !user.approved } : user
      )
    );
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      {/* CREATE / UPDATE FORM */}
      <div className="admin-form-section">
        <h2>{editMode ? "Update User" : "Create New User"}</h2>
        <form onSubmit={editMode ? handleUpdateUser : handleCreateUser}>
          <div className="admin-form-group">
            <label>Employee ID</label>
            <input
              type="number"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
              <option value="Innovation Manager">Innovation Manager</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="approved"
                checked={formData.approved}
                onChange={handleChange}
              />
              Approved for Idea Submission?
            </label>
          </div>

          <button type="submit" className="admin-submit-button">
            {editMode ? "Update" : "Create"}
          </button>
        </form>
      </div>

      {/* USER LIST */}
      <div className="admin-table-section">
        <h2>All Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Department</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.employee_id}</td>
                <td>{user.full_name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>
                  {user.approved ? (
                    <span className="approved">Yes</span>
                  ) : (
                    <span className="not-approved">No</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="admin-action-button edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="admin-action-button delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleApproveClick(user._id)}
                    className="admin-action-button approve"
                  >
                    {user.approved ? "Revoke" : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
