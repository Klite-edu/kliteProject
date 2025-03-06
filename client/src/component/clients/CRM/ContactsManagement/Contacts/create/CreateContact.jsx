// import React, { useState } from "react";
// import "./createcontact.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import Sidebar from "../../../../../Sidebar/Sidebar";
// import Navbar from "../../../../../Navbar/Navbar";

// const CreateEmployee = () => {
//   const [employee, setEmployee] = useState({
//     fullName: "",
//     employeeID: "",
//     designation: "",
//     email: "",
//     password: "",
//     number: "",
//     address: "",
//     joiningDate: "",
//     specificEmail: "",
//     workAssigned: "",
//     notes: "",
//     callData: "",
//     status: "Active",
//     role: "user",
//     teamAssociation: "",
//     activityLog: "",
//     pastDataHistory: "",
//     receivedEmails: [],
//     sentEmails: [],
//   });

//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");
//   const [customPermissions] = useState(() => {
//     const storedPermissions = localStorage.getItem("permissions");
//     return storedPermissions ? JSON.parse(storedPermissions) : {};
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee({ ...employee, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}/api/employee/create`,
//         employee
//       );
//       navigate("/contactmgmt/contacts");
//     } catch (error) {
//       console.error("Error creating employee:", error);
//     }
//   };

//   return (
//     <>
//       <Sidebar role={role} customPermissions={customPermissions} />
//       <Navbar />
//       <div className="edit-div">
//         <h3 className="Edit-head">Create Employee</h3>
//         <div className="employee-edit-info">
//           <form onSubmit={handleSubmit}>
//             <div className="basic-info-edit">
//               <div className="form-employee-input">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={employee.fullName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Employee ID</label>
//                 <input
//                   type="text"
//                   name="employeeID"
//                   value={employee.employeeID}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Designation</label>
//                 <input
//                   type="text"
//                   name="designation"
//                   value={employee.designation}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={employee.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={employee.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   name="number"
//                   value={employee.number}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Address</label>
//                 <textarea
//                   name="address"
//                   value={employee.address}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Joining Date</label>
//                 <input
//                   type="date"
//                   name="joiningDate"
//                   value={employee.joiningDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Specific Email</label>
//                 <input
//                   type="email"
//                   name="specificEmail"
//                   value={employee.specificEmail}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Work Assigned</label>
//                 <input
//                   type="text"
//                   name="workAssigned"
//                   value={employee.workAssigned}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Notes</label>
//                 <textarea
//                   name="notes"
//                   value={employee.notes}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Call Data</label>
//                 <textarea
//                   name="callData"
//                   value={employee.callData}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Status</label>
//                 <select
//                   name="status"
//                   value={employee.status}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                   <option value="Suspended">Suspended</option>
//                 </select>
//               </div>
//               <div className="form-employee-input">
//                 <label>Role</label>
//                 <select
//                   name="role"
//                   value={employee.role}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="user">Employee</option>
//                 </select>
//               </div>
//               <div className="form-employee-input">
//                 <label>
//                   Team Association <span>{`{BUDDY}`}</span>
//                 </label>

//                 <input
//                   type="text"
//                   name="teamAssociation"
//                   value={employee.teamAssociation}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Activity Log</label>
//                 <textarea
//                   name="activityLog"
//                   value={employee.activityLog}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-employee-input">
//                 <label>Past Data History</label>
//                 <textarea
//                   name="pastDataHistory"
//                   value={employee.pastDataHistory}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="bottom-button">
//                 <button className="discard-btn" type="button">
//                   <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />{" "}
//                   Discard
//                 </button>
//                 <button className="create-btn" type="submit">
//                   Create Employee
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateEmployee;
import React, { useState } from "react";
import "./createcontact.css";
import Sidebar from "../../../../../Sidebar/Sidebar";
import Navbar from "../../../../../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    fullName: "",
    employeeID: "",
    designation: "",
    email: "",
    password: "",
    number: "",
    address: "",
    joiningDate: "",
    specificEmail: "",
    workAssigned: "",
    notes: "",
    callData: "",
    status: "Active",
    role: "user",
    teamAssociation: "",
    activityLog: "",
    pastDataHistory: "",
    receivedEmails: [],
    sentEmails: [],
  });

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [customPermissions] = useState(() => {
    const storedPermissions = localStorage.getItem("permissions");
    return storedPermissions ? JSON.parse(storedPermissions) : {};
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/employee/create`,
        employee
      );
      navigate("/contactmgmt/contacts");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <>
      <Sidebar role={role} customPermissions={customPermissions} />
      <Navbar />

      <div className="edit-create-div">
        <h3 className="Edit-create-head">Create Employee</h3>
        <div className="employee-create-edit-info">
          <form onSubmit={handleSubmit}>
            <div className="basic-create-info-edit">
              <div className="form-employee-input">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={employee.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-employee-input">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="employeeID"
                  value={employee.employeeID}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-employee-input">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-employee-input">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-employee-input">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-employee-input">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="number"
                  value={employee.number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-employee-input">
                <label>Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-employee-input">
                <label>Specific Email</label>
                <input
                  type="email"
                  name="specificEmail"
                  value={employee.specificEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="form-employee-input">
                <label>Work Assigned</label>
                <input
                  type="text"
                  name="workAssigned"
                  value={employee.workAssigned}
                  onChange={handleChange}
                />
              </div>
              <div className="form-employee-input">
                <label>Status</label>
                <select
                  name="status"
                  value={employee.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="form-employee-input">
                <label>Role</label>
                <select
                  name="role"
                  value={employee.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">Employee</option>
                </select>
              </div>
              <div className="form-employee-input">
                <label>
                  Team Association <span>{`{BUDDY}`}</span>
                </label>
                <input
                  type="text"
                  name="teamAssociation"
                  value={employee.teamAssociation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-employee-input">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={employee.notes}
                  onChange={handleChange}
                />
              </div>
              <div className="form-employee-input">
                <label>Call Data</label>
                <textarea
                  name="callData"
                  value={employee.callData}
                  onChange={handleChange}
                />
              </div>

              <div className="form-employee-input">
                <label>Address</label>
                <textarea
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-employee-input">
                <label>Activity Log</label>
                <textarea
                  name="activityLog"
                  value={employee.activityLog}
                  onChange={handleChange}
                />
              </div>
              <div className="form-employee-input">
                <label>Past Data History</label>
                <textarea
                  name="pastDataHistory"
                  value={employee.pastDataHistory}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="bottom-create-button">
              <button className="discard-btn" type="button">
                Discard
              </button>
              <button className="create-btn" type="submit">
                Create Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
