import React from "react";
import { useNavigate } from "react-router-dom";
import "./DropDown.css";

const DropDown = ({ categoriesData, setDropDown, isVisible }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  console.log(isVisible);
  return (
    <div className={`drop-down ${isVisible ? "show" : ""}`}>
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className="drop-down__item"
            onClick={() => submitHandle(i)}
          >
            <img src={i.image_Url} alt={i.title} />
            <h3 className="drop-down__title">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
