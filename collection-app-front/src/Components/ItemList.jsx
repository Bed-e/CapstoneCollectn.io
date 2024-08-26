import React from "react";
import MutableItem from "./MutableItem";
import "./ItemList.css";

function ItemList({ items, setItems, sortKey, user }) {
  //console.log(sortKey);

  // Sort items based on sortKey
  const sortedItems = [...items].sort((a, b) => {
    if (sortKey === "alphabetical") {
      return a.itemName.localeCompare(b.itemName);
    } else if (sortKey === "reverseAlphabetical") {
      return b.itemName.localeCompare(a.itemName);
    } else if (sortKey === "character") {
      return a.character.localeCompare(b.character);
    } else if (sortKey === "reverseCharacter") {
      return b.character.localeCompare(a.character);
    } else if (sortKey === "recent") {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    } else {
      return 0; // No sorting if no valid sortKey is provided
    }
  });

  return (
    <ul className="ItemList">
      {sortedItems.map((item) => (
        <MutableItem
          key={item._id}
          item={item}
          setItems={setItems}
          items={items}
          user={user}
        />
      ))}
    </ul>
  );
}

export default ItemList;
