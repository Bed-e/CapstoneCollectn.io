import React from "react";

function ItemList({ items }) {
  return (
    <ul>
      {console.log(items)}
      <li>list item here</li>
      <li>list item also</li>
    </ul>
  );
}

export default ItemList;
