import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

// Import Pages
import PanelLogin from "./component/PanelLogin/PanelLogin";
import Landing from "./component/landingPage/Landing";
import Dashboard from "./component/Dashboard/Dashboard";
import Subscription from "./component/Admin/subscription/Subscription";
import Billings from "./component/Admin/billings/Billings";
import SystemAnalytics from "./component/Admin/SystemAnalytics/SystemAnalytics";
import SupportTickets from "./component/Admin/Tickets/SupportTicket";
import Security from "./component/Admin/Security/Security";
import Performance from "./component/Admin/Performance/Performance";
import Client from "./component/clients/list/Client";
import User from "./component/User/list/User";
import Clientedit from "./component/clients/edit/Clientedit";
import ClientCreate from "./component/clients/create/ClientCreate";
import UserCreate from "./component/User/create/UserCreate";
import UserEdit from "./component/User/edit/UserEdit";
import Permisssions from "./component/Admin/permissions/Permissions";
import Settings from "./component/Admin/settings/Settings";
import Contacts from "./component/clients/CRM/ContactsManagement/Contacts/list/Contact";
import CreateContact from "./component/clients/CRM/ContactsManagement/Contacts/create/CreateContact";
import Leads from "./component/clients/CRM/leads/list/Leads";
import ChatBox from "./component/Admin/Chats/ChatBox";
import View from "./component/clients/CRM/ContactsManagement/Contacts/contactDescription/View";
import EditContact from "./component/clients/CRM/ContactsManagement/Contacts/edit/EditContact";
import Attendance from "./component/clients/attendence/attendence/Attendence";
import EmployeeLogin from "./component/clients/attendence/employeeLogin/EmployeeLogin";
import AddTask from "./component/clients/checklist/tasks/AddTask";
import DoerList from "./component/clients/checklist/doers/DoerList";
import TaskList from "./component/clients/checklist/tasks/TaskList";

const TrackImpressions = () => {
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/trackimpression`)
      .then((response) => console.log("Impression Tracked:", response.data))
      .catch((error) => console.error("Error tracking impression:", error));
  }, []);

  return null; // Runs in the background
};

const App = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="app">
      <TrackImpressions />
      <Routes>
        {/* ✅ Public Routes (Accessible Without Login) */}
        <Route path="/" element={<PanelLogin />} />
        <Route path="/landing" element={<Landing />} />

        {/* ✅ All Routes Accessible Without Authentication */}
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
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/check-addtask" element={<AddTask />} />
        <Route path="/check-tasklist" element={<TaskList />} />
      </Routes>
    </div>
  );
};

export default App;
