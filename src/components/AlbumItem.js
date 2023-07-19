import React from "react";

// Component for rendering each album item
const AlbumItem = ({
  item,
  update,
  updateAlbum,
  deleteAlbum,
  updateMenuList,
  inputValues,
  handleInputChange,
  cancelUpdate,
}) => {
  const img = require("../Logo.webp"); // Placeholder image for the album

  return (
    <div>
      {/* Album data */}
      <div className="albumdata_list" key={item.id}>
        <div>
          {/* Album cover image */}
          <img className="album" src={img} alt="Folder" />
          {/* Album title */}
          <p className="title">{item.title}</p>
        </div>
        <div>
          {updateMenuList[item.id] ? (
            /* Display update menu if the album is being updated */
            <div className="update-menu">
              {/* Input field for updating the album */}
              <input
                type="text"
                placeholder="Update ..."
                value={inputValues[item.id] || ""}
                onChange={(event) => handleInputChange(event, item.id)}
              />
              {/* Button to confirm the update */}
              <button
                className="update-button"
                onClick={() => updateAlbum(item.id, inputValues[item.id])}
              >
                Update
              </button>
              {/* Button to cancel the update */}
              <button
                className="cancel-button"
                onClick={() => cancelUpdate(item.id)}
              >
                X
              </button>
            </div>
          ) : (
            /* Display update and delete options if the album is not being updated */
            <div className="update-delete-div">
              {/* Button to initiate the update */}
              <button className="update-button" onClick={() => update(item.id)}>
                Update
              </button>
              {/* Button to delete the album */}
              <button
                className="update-button delete"
                onClick={() => deleteAlbum(item.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumItem;
