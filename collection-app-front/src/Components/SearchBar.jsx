import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleChange = (event) => {
    //console.log(`setting searchterm to ${event.target.value}`);
    setSearchTerm(event.target.value);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="search for items"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
