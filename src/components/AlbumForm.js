import React from "react";

// Component for rendering the form to add a new album
const AlbumForm = ({ inputValue, handleInputValueChange, handleSubmit }) => {
  return (
    <form className="add-album-form" onSubmit={handleSubmit}>
      {/* Input field for entering the album title */}
      <input
        className="input"
        type="text"
        placeholder="Enter Album Title"
        required
        value={inputValue}
        onChange={handleInputValueChange}
      />
      {/* Button to submit the form */}
      <button type="submit">+ Add</button>
    </form>
  );
};

export default AlbumForm;
