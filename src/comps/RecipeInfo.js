import React from "react";
import "../styles/RecipeInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const RecipeInfo = ({ toggle, selectedDocs }) => {
  const handleClose = () => {
    toggle();
  };

  return (
    <div className="DetailInfoContainer">
      <div className="DetailInfoInner">
        <div className="close-field">
          <span className="close" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className="DetailInfo">
          <div className="info">
            <div className="main-info">
              <div className="title">{selectedDocs.names.toUpperCase()}</div>
              <div className="category-text">{selectedDocs.categories}</div>
            </div>
            <div className="sub-info">
              <div className="ingredients-area">
                <h4>INGREDIENTS:</h4>
                <h5>{selectedDocs.ingredients}</h5>
              </div>
              <div className="instruction-area">
                <h4>INSTRUCTIONS:</h4>
                <h5>{selectedDocs.instructions}</h5>
              </div>
            </div>
          </div>
          <div className="image-container">
            <img src={selectedDocs.url} alt={selectedDocs.names} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
