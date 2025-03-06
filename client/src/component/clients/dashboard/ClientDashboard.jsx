import axios from "axios";
import React, { useEffect, useState } from "react";
import "./clientdashboard.css"; // External CSS import

const ClientDashboard = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const loggedInEmail = localStorage.getItem("email");

  // New State for Site Form
  const [siteData, setSiteData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    radius: "",
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (!loggedInEmail) {
          console.warn("No logged-in user found.");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/clientData/${loggedInEmail}`
        );
        setClient(response.data);
      } catch (error) {
        console.error("Error fetching client data", error);
      }
    };

    fetchClientData();
  }, [loggedInEmail]);

  const handleRenewSubscription = async () => {
    if (!client || !client.subscriptionPlan) {
      alert("No active subscription found.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/subscription/renew`,
        {
          clientId: client._id,
          subscriptionId: client.subscriptionId,
        }
      );

      alert(response.data.message || "Subscription renewed successfully!");

      // Refresh client data after renewal
      const updatedClient = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/clientData/${loggedInEmail}`
      );
      setClient(updatedClient.data);
    } catch (error) {
      console.error("Error renewing subscription", error);
      alert("Failed to renew subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSiteData({ ...siteData, [name]: value });
  };

  // ✅ Handle Form Submission
  const handleSubmitSite = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/sites`,
        siteData
      );
      alert(response.data.message);
      setSiteData({ name: "", latitude: "", longitude: "", radius: "" }); // Clear the form
    } catch (error) {
      console.error("Error adding site", error);
      alert("Failed to add site. Please try again.");
    }
  };

  return (
    <div className="client-dashboard">
      {client ? (
        <div className="client-data">
          <h2 className="client-title">Client Dashboard</h2>
          <table className="client-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{client.name}</td>
                <td>{client.subscriptionStatus}</td>
                <td>{client.email}</td>
              </tr>
            </tbody>
          </table>

          {client.subscriptionStatus === "expired" && (
            <button
              className="renew-button"
              onClick={handleRenewSubscription}
              disabled={loading}
            >
              {loading ? "Processing..." : "Renew Subscription"}
            </button>
          )}

          {/* ✅ Site Registration Form */}
          <h2 className="form-title">Add Site</h2>
          <form className="site-form" onSubmit={handleSubmitSite}>
            <div className="form-group">
              <label>Site Name:</label>
              <input
                type="text"
                name="name"
                value={siteData.name}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Latitude:</label>
              <input
                type="number"
                name="latitude"
                value={siteData.latitude}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Longitude:</label>
              <input
                type="number"
                name="longitude"
                value={siteData.longitude}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Radius:</label>
              <input
                type="number"
                name="radius"
                value={siteData.radius}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <button className="submit-button" type="submit">
              Submit Site
            </button>
          </form>
        </div>
      ) : (
        <p>Loading client data...</p>
      )}
    </div>
  );
};

export default ClientDashboard;
