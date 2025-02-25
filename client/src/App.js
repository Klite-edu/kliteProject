import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom"; // Correctly import Route and Routes
import PanelLogin from "./component/PanelLogin/PanelLogin";
import Dashboard from "./component/Dashboard/Dashboard";
import Clientedit from "./component/clients/edit/Clientedit";
import ClientCreate from "./component/clients/create/ClientCreate";
import Client from "./component/clients/list/Client";
import User from "./component/User/list/User";
import UserCreate from "./component/User/create/UserCreate";
import UserEdit from "./component/User/edit/UserEdit";
import Permisssions from "./component/Admin/permissions/Permissions";
import Subscription from "./component/Admin/subscription/Subscription";
import Settings from "./component/Admin/settings/Settings";
import Contacts from "./component/Admin/CRM/ContactsManagement/Contacts/list/Contact";
import CreateContact from "./component/Admin/CRM/ContactsManagement/Contacts/create/CreateContact";
import Leads from "./component/Admin/CRM/leads/list/Leads";
import Landing from "./component/landingPage/Landing";
import ChatBox from "./component/Admin/Chats/ChatBox";
import Billings from "./component/Admin/billings/Billings";
import SystemAnalytics from "./component/Admin/SystemAnalytics/SystemAnalytics";
import SupportTickets from "./component/Admin/Tickets/SupportTicket";
import Security from "./component/Admin/Security/Security";
import Performance from "./component/Admin/Performance/Performance";
import axios from "axios";
import View from "./component/Admin/CRM/ContactsManagement/Contacts/contactDescription/View";
import EditContact from "./component/Admin/CRM/ContactsManagement/Contacts/edit/EditContact";

const TrackImpressions = () => {
  useEffect(() => {
    axios.post("http://localhost:5000/api/trackimpression")
      .then(response => console.log("Impression Tracked:", response.data))
      .catch(error => console.error("Error tracking impression:", error));
  }, []);

  return null; // Runs in the background
};

const App = () => {
  return (
    <div className="app">
      <TrackImpressions /> {/* Move outside of Routes to ensure it runs properly */}
      <Routes>
        <Route path="/" element={<PanelLogin />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscriptions" element={<Subscription />} />
        <Route path="/billings" element={<Billings />} />
        <Route path="/systemanalytics" element={<SystemAnalytics />} />
        <Route path="/supporttickets" element={<SupportTickets />} />
        <Route path="/security" element={<Security />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/users" element={<User />} />
        <Route path="/clients/edit/:id" element={<Clientedit />} />
        <Route path="/clients/create" element={<ClientCreate />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
        <Route path="/permissions" element={<Permisssions />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contactmgmt/contacts" element={<Contacts />} />
        <Route path="/crm/leads" element={<Leads />} />
        <Route path="/contactmgmt/create" element={<CreateContact />} />
        <Route path="/contactmgmt/edit/:id" element={<EditContact />} />
        <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/contactsmgmt/view/:id" element={<View />} />
      </Routes>
    </div>
  );
};

export default App;

