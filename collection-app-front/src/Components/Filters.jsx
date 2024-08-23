import React from "react";

function Filters({ setSortKey }) {
  // Handle the change in the select dropdown
  const handleChange = (event) => {
    const selectedOption = event.target.value; // Get the selected value
    //console.log(`setting sortkey to ${selectedOption}`);
    setSortKey(selectedOption); // Update the sortKey state with the selected value
  };

  return (
    <h2>
      <select onChange={handleChange} name="sortingMethods">
        <option value="alphabetical">Alphabetical (A to Z)</option>
        <option value="reverseAlphabetical">
          Reverse Alphabetical (Z to A)
        </option>
        <option value="character">Alphabetical by Character (A to Z)</option>
        <option value="reverseCharacter">
          Reverse Alphabetical by Character (Z to A)
        </option>
      </select>
    </h2>
  );
}

export default Filters;
