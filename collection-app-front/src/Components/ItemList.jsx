import React from "react";
import MutableItem from "./MutableItem";

function ItemList({ items, setItems }) {
  return (
    <ul>
      {items.map((item, index) => (
        <MutableItem
          key={index}
          item={item}
          setItems={setItems}
          items={items}
          index={index}
        />
      ))}
    </ul>
  );
}

export default ItemList;
