import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FireDatabase from "../hooks/FireDatabase";
import AddRecipe from "./AddRecipe";
import "../styles/MyRecipe.css";
import { projectFirestore, projectStorage } from "../firebase/config";
import EditRecipe from "./EditRecipe";
import RecipeInfo from "./RecipeInfo";

const MyRecipe = () => {
  const [seen, setSeen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState("");
  const [editDocs, setEditDocs] = useState("");
  const [documents, setDocs] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");
  const { docs } = FireDatabase("recipes");

  useEffect(() => {
    handleSelectChange(selectedCat);
  }, [docs]);

  const toggleEdit = () => {
    setEdit(!edit);
  };
  const togglePop = () => {
    setSeen(!seen);
  };
  const toggleInfo = () => {
    setInfo(!info);
  };

  const handleDelete = (id, url) => {
    if (
      url ===
      "https://firebasestorage.googleapis.com/v0/b/myrecipeapp-480a8.appspot.com/o/default%2Fdefaultimg.png?alt=media&token=e87cf627-7a5d-4b83-9edf-59ed1da0619f"
    ) {
      const itemRef = projectFirestore.collection("recipes").doc(id);
      itemRef.delete();
    } else {
      const itemRef = projectFirestore.collection("recipes").doc(id);
      const storageRef = projectStorage.refFromURL(url);
      itemRef.delete();
      storageRef.delete();
    }
  };
  const handleSelectChange = (selectedCategory) => {
    setSelectedCat(selectedCategory);
    selectedCategory === "All"
      ? setDocs(docs)
      : setDocs(docs.filter((doc) => doc.categories === selectedCategory));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setDocs(
      documents.filter((doc) => {
        return doc.names.toLowerCase().includes(search.toLowerCase());
      })
    );
    setSearch("");
  };

  const handleEdit = (doc) => {
    toggleEdit();
    setEditDocs(doc);
  };

  const handleDetailInfo = (doc) => {
    toggleInfo();
    setSelectedDocs(doc);
  };

  return (
    <div className="myreciepe">
      {seen ? <AddRecipe toggle={togglePop} /> : null}
      {edit ? <EditRecipe toggle={toggleEdit} editDocs={editDocs} /> : null}
      {info ? (
        <RecipeInfo toggle={toggleInfo} selectedDocs={selectedDocs} />
      ) : null}
      <form onSubmit={handleSearch} className="search-form">
        <select
          onChange={(e) => handleSelectChange(e.target.value)}
          className="select-form"
        >
          <option value="All">All</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Main Dish">Main Dish</option>
          <option value="Side Dish">Side Dish</option>
          <option value="Baking">Baking</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
          value={search}
          type="search"
        />
        <button className="search-button" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <ul className="card-form">
        <li className="card-list" onClick={togglePop}>
          <FontAwesomeIcon icon={faPlus} />
        </li>
        {documents &&
          documents.map((doc) => (
            <li className="card-list" key={doc.id}>
              <img
                onClick={() => handleDetailInfo(doc)}
                src={doc.url}
                alt={doc.names}
              />
              <h3
                style={{
                  fontWeight: "normal",
                  marginTop: "0.5rem",
                  fontSize: "14px",
                }}
              >
                {doc.names}
              </h3>
              <div className="card-info">
                <button onClick={() => handleEdit(doc)}>Edit</button>

                <button onClick={() => handleDelete(doc.id, doc.url)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyRecipe;
