import React from "react";

function ItemList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {/*console.log(item.item)*/}
          <h3>{item.item.itemName}</h3>
          <p>{item.item.description}</p>
          <p>
            <strong>Character:</strong> {item.item.character}
          </p>
          {item.item.image && item.item.image.image && (
            <img
              src={item.item.image.image}
              alt={item.item.itemName}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
