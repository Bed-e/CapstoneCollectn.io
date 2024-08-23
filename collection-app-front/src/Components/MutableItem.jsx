import React, { useState } from "react";
import axios from "axios";

function MutableItem({ item, setItems, items, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);
  const [newImage, setNewImage] = useState(null); // State to hold the new image file

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // Set the new image as base64
        setEditedItem((prev) => ({
          ...prev,
          image: { image: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3003/items/${editedItem._id}`,
        editedItem
      );

      let index = NaN;
      for (let i = 0; i < items.length; i++) {
        if (editedItem._id === items[i]._id) {
          index = i;
          break;
        }
      }

      const itemsCopy = [...items];
      if (!isNaN(index)) {
        itemsCopy.splice(index, 1, editedItem);
      }

      setItems(itemsCopy);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <li className="item">
      {isEditing ? (
        <>
          <input
            type="text"
            name="itemName"
            value={editedItem.itemName}
            onChange={handleInputChange}
          />
          <input
            type="text"
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newImage && (
            <img
              src={newImage}
              alt="New upload"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          )}
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{editedItem.itemName}</h3>
          <p>{editedItem.description}</p>
          <p>
            <strong>Character:</strong> {editedItem.character}
          </p>
          {editedItem.image && (
            <img
              src={editedItem.image.image}
              alt={editedItem.itemName}
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
