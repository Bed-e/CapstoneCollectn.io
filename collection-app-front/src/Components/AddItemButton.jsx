import React from "react";

const AddItemButton = ({ setShowForm, showForm }) => {
  return (
    <button
      className="AddItemButton"
      onClick={() => setShowForm(!showForm)} // Toggle the form visibility
    >
      +
    </button>
  );
};

export default AddItemButton;
