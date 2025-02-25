import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Dropdown } from "react-bootstrap";
import person from "../../assets/person_1.jpg";
import { useNavigate } from "react-router";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="admin-navbar">
      <div className="navadmin-icon">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search admin-icon"
        />
        <div>
          <FontAwesomeIcon icon={faGear} className="gear admin-icon" />
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-custom-components"
              className="custom-dropdown-toggle"
            >
              <img src={person} alt="" className="accountimg-icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="custom-dropdown-menu">
              <Dropdown.Item href="/admin/account/settings/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/" onClick={handleLogout}>
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
