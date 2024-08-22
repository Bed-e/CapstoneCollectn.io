import React, { useState } from "react";
import axios from "axios";

function ItemAddForm({ setItems, items, userId }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [character, setCharacter] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If there's no file, do nothing
    if (!file) return;

    // Create a new FileReader() object
    let reader = new FileReader();

    // Setup the callback event to run when the file is read
    reader.onload = async () => {
      // Create the item object
      const newItem = {
        itemName: itemName,
        description: description,
        character: character,
        image: {
          image: reader.result, // This will be the base64 string of the image
        },
      };

      try {
        // Post the item object to the backend
        const response = await axios.post(
          "http://localhost:3003/items",
          newItem
        );

        // Get the added item and its ID
        const myItem = response.data.item;
        //const itemId = myItem._id;

        // Update the items state
        console.log(items);
        console.log(myItem);
        //setItems([...items, myItem]);
        const newItems = [...items, myItem];
        console.log(newItems);
        setItems(newItems);

        // Get the current user's data
        const userResponse = await axios.get(
          `http://localhost:3003/users/${userId}`
        );
        const user = userResponse.data.user;

        // Append the new itemId to the owns array
        //const updatedOwnsArray = [...user.owns, itemId];

        // Send a PUT request to update the user's owns array
        // await axios.put(`http://localhost:3003/users/${userId}`, {
        //   owns: updatedOwnsArray,
        // });
      } catch (error) {
        console.error("Error adding item or updating user:", error);
      }
    };

    // Read the file as a data URL (base64 string)
    reader.readAsDataURL(file);

    setItemName("");
    setDescription("");
    setCharacter("");
    setFile(null);
  };

  return (
    <div>
      <h3>Add a new item?</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="character"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
        />
        <label htmlFor="file">File to upload</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Submit!</button>
      </form>
    </div>
  );
}

export default ItemAddForm;
