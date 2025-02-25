import {
  faTachometerAlt,
  faUsers,
  faCog,
  faChartBar,
  faShoppingCart,
  faLifeRing,
  faAngleUp,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const sidebarConfig = {
  admin: [
    { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
    {
      name: "Manage Users",
      path: "/users",
      icon: faUsers,
      options: [
        { name: "Clients", path: "/clients" },
        { name: "Users", path: "/users" },
      ],
    },
    { name: "Subscriptions", path: "/subscriptions", icon: faCog },
    { name: "chats", path: "/chatbox", icon: faCog },
    { name: "Billings", path: "/billings", icon: faCog },
    { name: "System Analytics", path: "/systemanalytics", icon: faCog },
    { name: "Support Tickets", path: "/supporttickets", icon: faCog },
    { name: "Security", path: "/landing", icon: faCog },
    { name: "Settings", path: "/settings", icon: faCog },
    { name: "System Health", path: "/performance", icon: faCog },
    { name: "Notification", path: "/chatbox", icon: faCog },
  ],
  client: [
    {
      name: "CRM",
      path: "/dashboard",
      icon: faCog,
      options: [
        { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
        { name: "Permissions", path: "/permissions", icon: faCog },
        {
          name: "Contact Managment",
          path: "/contactmgmt",
          icon: faCog,
          options: [
            { name: "Contacts", path: "/contactmgmt/contacts", icon: faCog },
            { name: "Companies", path: "/contactmgmt/clients", icon: faCog },
          ],
        },
        { name: "Deals", path: "/clients", icon: faCog },
        { name: "Leads", path: "/crm/leads", icon: faCog },
        { name: "Pipeline", path: "/clients", icon: faCog },
        { name: "Projects", path: "/clients" },
        { name: "Tasks", path: "/clients" },
        { name: "Proposals", path: "/clients" },
        { name: "Contracts", path: "/clients" },
        { name: "Invoices", path: "/clients" },
        { name: "Payments", path: "/clients" },
        { name: "Analytics", path: "/clients" },
      ],
    },
    { name: "Calendar", path: "/calendar", icon: faChartBar },
    {
      name: "Manage User",
      icon: faUsers,
      options: [{ name: "Users", path: "/users" }],
    },
    { name: "Reports", path: "/reports", icon: faChartBar },
    { name: "Payment", path: "/payment", icon: faShoppingCart },
    { name: "Analytics", path: "/analytics", icon: faChartBar },
  ],
  user: [
    { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
    { name: "Support", path: "/support", icon: faLifeRing },
    { name: "Reports", path: "/reports", icon: faChartBar },
    { name: "Calendar", path: "/calendar", icon: faChartBar },
    { name: "Payment", path: "/payment", icon: faShoppingCart },
    { name: "Analytics", path: "/analytics", icon: faChartBar },
  ],
};

export default sidebarConfig;
