import React from "react";

const AddFirstItem = ({ setShowForm, showForm }) => {
  function handleAddItem() {
    console.log(`settingShowForm to true`);
    setShowForm(true); // Show the form
  }

  return !showForm ? (
    <div className="AddFirstItem">
      <button onClick={handleAddItem} className="add-item-button">
        +
      </button>
      <p>Add your first item</p>
    </div>
  ) : (
    console.log(`ree`)
  );
};

export default AddFirstItem;
