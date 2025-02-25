import axios from "axios";
import React, { useEffect, useState } from "react";

const apiUrl = "http://localhost:5000";

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

        const response = await axios.get(`${apiUrl}/api/users/userData/${loggedInEmail}`);
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
    <>
      {user ? (
        <div>
          <table>
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
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </>
  );
};

export default UserDashboard;
