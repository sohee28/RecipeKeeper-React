import React, { useState, useEffect } from "react";
import { projectFirestore, projectStorage } from "../firebase/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/AddRecipe.css";
import AddRecipeimg from "../image/addrecipeback.svg";
import Default from "../image/defaultimg.png";

const AddRecipe = ({ toggle }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [names, setNames] = useState("");
  const [categories, setCategories] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");

  const types = ["image/png", "image/jpeg"];

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    if (file === null) {
      console.log("file is null");
      const defaultRef = projectStorage.refFromURL(
        "gs://myrecipeapp-480a8.appspot.com/default/defaultimg.png"
      );
      const firebaseCollection = projectFirestore.collection("recipes");
      defaultRef.getDownloadURL().then(function (url) {
        console.log(url);
        firebaseCollection.add({
          names,
          categories,
          instructions,
          ingredients,
          url,
        });
        setNames("");
        setCategories("");
        setInstructions("");
        setIngredients("");
        setFile("");
      });
    } else {
      console.log(file);
      const StorageRef = projectStorage.ref(file.name);
      const firebaseCollection = projectFirestore.collection("recipes");

      StorageRef.put(file).on(
        "state_changed",
        (snap) => {
          let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await StorageRef.getDownloadURL();
          firebaseCollection.add({
            names,
            categories,
            instructions,
            ingredients,
            url,
          });
          setNames("");
          setCategories("");
          setInstructions("");
          setIngredients("");
          setFile("");
        }
      );
    }
  };

  const handleClose = () => {
    toggle();
  };

  const handleUploadFile = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <div className="AddRecipeClass">
      <form className="AddRecipeForm" onSubmit={handleSubmit}>
        <div className="close-field">
          <span className="close" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className="AddRecipeForm-together">
          <div className="AddRecipeForm-left">
            <div className="name">
              <label>Name: </label>
              <input
                className="name-field"
                type="text"
                value={names}
                required
                onChange={(e) => setNames(e.target.value)}
              ></input>
            </div>
            <div className="category">
              <label>Category :</label>
              <select
                className="category-field"
                name="category"
                value={categories}
                defaultValue={"Category"}
                required
                onChange={(e) => setCategories(e.target.value)}
              >
                <option value="Category">Category</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Main Dish">Main Dish</option>
                <option value="Side Dish">Side Dish</option>
                <option value="Baking">Baking</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>
            <div className="instruction">
              <label>Instructions: </label>
              <textarea
                className="instruction-field"
                type="text"
                value={instructions}
                required
                onChange={(e) => setInstructions(e.target.value)}
              ></textarea>
            </div>
            <div className="ingredient">
              <label>Ingredients:</label>
              <textarea
                className="ingredient-field"
                type="text"
                value={ingredients}
                required
                onChange={(e) => setIngredients(e.target.value)}
              ></textarea>
            </div>
            <div className="file-button">
              <label>Image:</label>
              <label className="file-label">
                <input
                  className="image-field"
                  type="file"
                  onChange={handleUploadFile}
                ></input>
                <span>+</span>
              </label>
              <div className="file-output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
              </div>
            </div>
          </div>
          <div className="AddRecipeForm-right">
            <img
              className="image"
              src={AddRecipeimg}
              alt="addrecipe"
              height="300px"
              width="300px"
            ></img>
            <div className="submit-button">
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
