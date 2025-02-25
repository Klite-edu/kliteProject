import axios from "axios";
import React, { useEffect, useState } from "react";

const apiUrl = "http://localhost:5000";

const ClientDashboard = () => {
  const [client, setClient] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const loggedInEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (!loggedInEmail) {
          console.warn("No logged-in user found.");
          return;
        }

        const response = await axios.get(`${apiUrl}/api/clientData/${loggedInEmail}`);
        console.log("client-plan", response.data);
        setClient(response.data);
      } catch (error) {
        console.error("Error fetching client data", error);
      }
    };

    fetchClientData();
  }, [loggedInEmail]);

  const handleRenewSubscription = async () => {
    if (!client || !client.subscriptionPlan
    ) {
      alert("No active subscription found.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/api/subscription/renew`, {
        clientId: client._id,
        subscriptionId: client.subscriptionId,
      });

      alert(response.data.message || "Subscription renewed successfully!");

      // Refresh client data after renewal
      const updatedClient = await axios.get(`${apiUrl}/api/clientData/${loggedInEmail}`);
      setClient(updatedClient.data);
    } catch (error) {
      console.error("Error renewing subscription", error);
      alert("Failed to renew subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {client ? (
        <div>
          <table>
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

          {/* Show Renew Button if Subscription is Expired */}
          {client.subscriptionStatus === "expired" && (
            <button onClick={handleRenewSubscription} disabled={loading}>
              {loading ? "Processing..." : "Renew Subscription"}
            </button>
          )}
        </div>
      ) : (
        <p>Loading client data...</p>
      )}
    </>
  );
};

export default ClientDashboard;
