import React from "react";
import AlbumItem from "./AlbumItem";

// Component for rendering a list of albums
const AlbumList = ({
  data,
  update,
  updateAlbum,
  deleteAlbum,
  updateMenuList,
  inputValues,
  handleInputChange,
  cancelUpdate,
}) => {
  return (
    <div className="albumdata">
      {/* Check if there is data available */}
      {data.length > 0 ? (
        /* Render each album item */
        data.map((item) => (
          <AlbumItem
            key={item.id}
            item={item}
            update={update}
            updateAlbum={updateAlbum}
            deleteAlbum={deleteAlbum}
            updateMenuList={updateMenuList}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
            cancelUpdate={cancelUpdate}
          />
        ))
      ) : (
        /* Render a message when no data is available */
        <p>No data available.</p>
      )}
    </div>
  );
};

export default AlbumList;
