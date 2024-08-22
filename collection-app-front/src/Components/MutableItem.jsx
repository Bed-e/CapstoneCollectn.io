import React, { useState } from "react";
import axios from "axios";

function MutableItem({ item, setItems, items, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item.item);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log(editedItem);
      const response = await axios.put(
        `http://localhost:3003/items/${editedItem._id}`,
        editedItem
      );
      const updatedItem = response.data;

      // Update the items array with the updated item

      console.log(updatedItem); //i'm onto something here
      //start here after lunch
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            name="itemName"
            value={editedItem.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            value={editedItem.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="character"
            value={editedItem.character}
            onChange={handleInputChange}
          />
          {editedItem.image && (
            <img
              src={editedItem.image.image}
              alt={editedItem.name}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          )}
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {console.log(item)}

          <h3>{item.itemName}</h3>
          <p>{item.description}</p>
          <p>
            <strong>Character:</strong> {item.character}
          </p>

          {item.image && (
            <img
              src={item.image.image}
              alt={item.itemName}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          )}
          <button onClick={handleEditToggle}>Edit</button>
        </>
      )}
    </li>
  );
}

export default MutableItem;
