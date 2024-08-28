import React from "react";
import MutableItem from "./MutableItem";
import "./ItemList.css";
import AddFirstItem from "./AddFirstItem";

function ItemList({
  sortKey,
  items,
  setItems,
  user,
  setShowForm,
  showForm,
  searchTerm,
}) {
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

  // Filter items based on searchTerm
  const filteredItems = sortedItems.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.itemName.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.character.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div>
      {items.length > 0 ? (
        <ul className="ItemList">
          {filteredItems.map((item) => (
            <MutableItem
              key={item._id}
              item={item}
              setItems={setItems}
              items={items}
              user={user}
            />
          ))}
        </ul>
      ) : (
        <AddFirstItem setShowForm={setShowForm} showForm={showForm} />
      )}
    </div>
  );
}

export default ItemList;
