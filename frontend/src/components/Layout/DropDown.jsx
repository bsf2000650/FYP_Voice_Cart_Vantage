import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import './DropDown.css'

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm drop-down">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div 
            key={index}
            className={`${styles.noramlFlex} border-b border-white mx-2`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                // width: "50px",
                // height: "50px",
                // objectFit: "contain",
                // marginLeft: "10px",
                // userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none mx-3">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
