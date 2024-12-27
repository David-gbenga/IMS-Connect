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
    approved: false, // NOTE: This field isn't in your current schema. See note below.
  });

  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  // 1. Fetch all staff on component mount
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("/api/v1/staff");
        if (!response.ok) {
          throw new Error("Failed to fetch staff list");
        }
        const data = await response.json();
        // According to your controller, the response shape is { all_staff: [...] }
        setUsers(data.all_staff || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchStaff();
  }, []);

  // 2. Handle input changes (create or edit)
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
    try {
      const response = await fetch("/api/v1/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error creating staff");
      }
      const { StaffData } = await response.json();

      // Add the newly created staff to state
      setUsers((prev) => [...prev, StaffData]);

      // Reset form
      setFormData({
        employee_id: "",
        full_name: "",
        role: "Employee",
        email: "",
        department: "",
        approved: false,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please check the console for more info.");
    }
  };

  // 4. Select a user to edit
  const handleEditClick = (user) => {
    setEditMode(true);
    setEditUserId(user._id);
    // Pre-fill the form with the user's existing data
    setFormData({
      employee_id: user.employee_id || "",
      full_name: user.full_name || "",
      role: user.role || "Employee",
      email: user.email || "",
      department: user.department || "",
      approved: user.approved || false, // Not in your schema by default
    });
  };

  // 5. Update user details
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/staff/${editUserId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error updating staff");
      }
      const { staff2 } = await response.json(); // your controller responds with { msg, staff2 }

      // Update local state
      setUsers((prev) =>
        prev.map((user) => (user._id === editUserId ? staff2 : user))
      );

      // Reset
      setEditMode(false);
      setEditUserId(null);
      setFormData({
        employee_id: "",
        full_name: "",
        role: "Employee",
        email: "",
        department: "",
        approved: false,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Check console for more info.");
    }
  };

  // 6. Delete a user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/v1/staff/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting staff");
      }
      // The controller returns { msg: "staff deleted", task: staff3 } on success
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Check console for more info.");
    }
  };

  // 7. Toggle "approved" for employees to submit ideas
  // Not in your schema. If you want to store it in DB, add a field or handle partial update
  const handleApproveClick = async (userId) => {
    try {
      // Find the user
      const userToToggle = users.find((u) => u._id === userId);
      if (!userToToggle) return;

      // Toggle in local state first (optimistic update)
      const newApprovedStatus = !userToToggle.approved;

      // If you want to store this in DB, do a partial update:
      // For example: PATCH /api/v1/staff/:id with { approved: newApprovedStatus }
      // BUT you need 'approved' in your schema for this to work persistently.
      await fetch(`/api/v1/staff/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: newApprovedStatus }),
      });

      // Update local state
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, approved: newApprovedStatus } : user
        )
      );
    } catch (error) {
      console.error("Error toggling approve status:", error);
      alert("Failed to toggle approval status. Check console for more info.");
    }
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
