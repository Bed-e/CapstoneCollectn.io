import React from "react";

const ColorPicker = ({ handleColor1Change, handleColor2Change }) => {
  return (
    <div className="ColorPicker">
      <label>
        Primary Color:
        <input
          type="color"
          onChange={(event) => handleColor1Change(event.target.value)}
          defaultValue="#DBDBDB" // Default primary color
        />
      </label>
      <br />
      <label>
        Secondary Color:
        <input
          type="color"
          onChange={(event) => handleColor2Change(event.target.value)}
          defaultValue="#000000" // Default secondary color
        />
      </label>
    </div>
  );
};

export default ColorPicker;
