import React from "react";

const AddFirstItem = ({ setShowForm }) => {
  function handleAddItem() {
    console.log(`settingShowForm to true`);
    setShowForm(true); // Show the form
  }

  return (
    <div className="AddFirstItem">
      <button onClick={handleAddItem} className="add-item-button">
        +
      </button>
      <p>Add your first item</p>
    </div>
  );
};

export default AddFirstItem;
