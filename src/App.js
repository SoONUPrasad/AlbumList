import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import AlbumList from "./components/AlbumList";
import AlbumForm from "./components/AlbumForm";

function App() {
  const [data, setData] = useState([]); // State for storing the album data
  const [updateMenuList, setUpdateMenuList] = useState({}); // State for managing update menu visibility
  const [inputValues, setInputValues] = useState({}); // State for storing input values in the update menu
  const [inputValue, setInputValue] = useState(""); // State for storing the input value in the add album form
  const [showForm, setShowForm] = useState(false); // State for managing the visibility of the add album form

  useEffect(() => {
    fetchData();
  }, []);

  // Fetches album data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Shows the add album form
  const addAlbum = () => {
    setShowForm(true);
  };

  // Handles input change in the update menu
  const handleInputChange = (event, id) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: event.target.value, // Update the input value for the corresponding album item
    }));
  };

  // Handles input change in the add album form
  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handles form submission for adding a new album
  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputValue("");
    setShowForm(false);

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/albums",
        {
          title: inputValue,
          userId: 1, // Replace with an appropriate user ID
        }
      );

      const newAlbum = {
        id: Date.now(), // Generate a unique ID using the current timestamp
        title: response.data.title,
        userId: response.data.userId,
      };

      setData((prevData) => [...prevData, newAlbum]);
      setUpdateMenuList((prevList) => ({
        ...prevList,
        [newAlbum.id]: false,
      }));
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  // Updates an existing album
  const updateAlbum = async (id, inputValue) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        title: inputValue,
        userId: 1, // Replace with an appropriate user ID
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, title: inputValue } : item
        )
      );

      setUpdateMenuList((prevList) => ({
        ...prevList,
        [id]: false,
      }));
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  // Deletes an album
  const deleteAlbum = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  // Cancels the update operation for an album
  const cancelUpdate = (id) => {
    setUpdateMenuList((prevList) => ({
      ...prevList,
      [id]: false,
    }));
  };

  // Activates the update operation for an album
  const update = (id) => {
    setUpdateMenuList((prevList) => ({
      ...prevList,
      [id]: true,
    }));
  };

  return (
    <div className="App">
      <Navbar />
      {/* Conditional rendering of the add album form or the add album button */}
      {showForm ? (
        <AlbumForm
          inputValue={inputValue}
          handleInputValueChange={handleInputValueChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <button className="add-album" onClick={addAlbum}>
          +Add Album
        </button>
      )}

      {/* Renders the album list */}
      <AlbumList
        data={data}
        update={update}
        updateAlbum={updateAlbum}
        deleteAlbum={deleteAlbum}
        updateMenuList={updateMenuList}
        inputValues={inputValues}
        handleInputChange={handleInputChange}
        cancelUpdate={cancelUpdate}
      />
    </div>
  );
}

export default App;
