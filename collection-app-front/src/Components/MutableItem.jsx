import React, { useState } from "react";
import axios from "axios";

function MutableItem({ item, setItems, items, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      //console.log(editedItem);
      const response = await axios.put(
        `http://localhost:3003/items/${editedItem._id}`,
        editedItem
      );
      //Update the items array with the updated item

      //console.log(editedItem); //i'm onto something here
      //find index of edited item
      let index = NaN;
      for (let i = 0; i < items.length; i++) {
        //console.log(items[i]);
        if (editedItem._id === items[i]._id) {
          index = i;
          break;
        }
      }
      // Make a copy of the items array
      const itemsCopy = [...items];

      // Change the element of the copy at index to the updatedItem
      if (!isNaN(index)) {
        itemsCopy.splice(index, 1, editedItem);
      }

      // Set items to the copy of the array with the changed element
      //console.log(itemsCopy);
      setItems(itemsCopy);

      setIsEditing(false);
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
          {editedItem.image && (
            <img
              src={editedItem.image.image}
              alt={editedItem.itemName}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          )}
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {/* {console.log(item)} */}

          <h3>{editedItem.itemName}</h3>
          <p>{editedItem.description}</p>
          <p>
            <strong>Character:</strong> {editedItem.character}
          </p>

          {editedItem.image && (
            <img
              src={editedItem.image.image}
              alt={editedItem.name}
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
