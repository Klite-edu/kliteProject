import axios from "axios";
import React, { useEffect, useState } from "react";
import "./userdashboard.css";

const UserDashboard = ({ onSave, permissions }) => {
  const [user, setUser] = useState(null);
  const loggedInEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!loggedInEmail) {
          console.warn("No logged-in user found.");
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/userData/${loggedInEmail}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [loggedInEmail]);

  const handleSavePermissions = (updatedPermissions) => {
    // Save the updated permissions to parent
    onSave(updatedPermissions);
  };

  return (
    <div className="user-dashboard">
      {user ? (
        <div className="user-data">
          <h1>User Dashboard</h1>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Role</th>
                <th>Email</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.fullName}</td>
                <td>{user.status}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="loading-message">Loading user data...</p>
      )}
    </div>
  );
};

export default UserDashboard;
