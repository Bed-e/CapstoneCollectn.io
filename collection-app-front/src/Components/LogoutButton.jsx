import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton({ handleLogout }) {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout(); // Clear user state in App.jsx
    navigate("/login"); // Navigate to login page
  };

  return (
    <div>
      <button onClick={onLogoutClick}>Log out</button>
    </div>
  );
}

export default LogoutButton;
