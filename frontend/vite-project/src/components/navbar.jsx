import React from "react";
import { Menu, Bell, ShieldCheck, UsersRound, Sparkles, X } from "lucide-react";
import "./navbar.css";

const Navbar = ({ title, setSidebarOpen = () => {}, sidebarOpen = false }) => {
  const handleMenuClick = () => {
    if (typeof setSidebarOpen === "function") {
      setSidebarOpen((prev) => !prev);
    }
  };
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const Icon = sidebarOpen ? X : Menu;
  const isAdmin = user?.role === "admin";
  const roleLabel = isAdmin ? "Admin" : "Staff";
  const ProfileIcon = isAdmin ? ShieldCheck : UsersRound;

  return (
    <div className="navbar">
      <div className="nav-item">
        <Icon
          size={20}
          className="menu-toggle"
          onClick={handleMenuClick}
        />
        <h4>{title}</h4>
        <div className="nav-action">
          <div className="nav-project-ticker" aria-label="ElectroStock smart inventory management">
            <Sparkles size={16} className="ticker-icon" aria-hidden="true" />
            <div className="ticker-window" aria-hidden="true">
              <div className="ticker-track">
                <span>ElectroStock&nbsp; • &nbsp;Smart Inventory Management&nbsp; • &nbsp;</span>
                <span>ElectroStock&nbsp; • &nbsp;Smart Inventory Management&nbsp; • &nbsp;</span>
              </div>
            </div>
          </div>

          <button className="notification-button" type="button" aria-label="Notifications">
            <Bell size={19} />
            <span className="notification-dot" />
          </button>

          <button className="profile" type="button" aria-label={`${roleLabel} profile`}>
            <span className={`profile-avatar ${isAdmin ? "admin-avatar" : "staff-avatar"}`}>
              <ProfileIcon size={19} strokeWidth={2.2} />
            </span>
            <span className="profile-details">
              <span className="profile-name">{roleLabel}</span>
              <span className="profile-role">{isAdmin ? "Administrator" : "Staff member"}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
