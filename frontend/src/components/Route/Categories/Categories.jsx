import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding hidden md:grid md:grid-cols-2 lg:grid-cols-4 my-6 md:my-8 gap-4 w-full bg-[#ff7f29] p-4 md:p-6 rounded-[50px] shadow-md border-b border-gray-300">
          {brandingData &&
            brandingData.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-white text-2xl md:text-3xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-white text-xs md:text-sm">
                    {item.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Categories Section */}
      <div
        className={`${styles.section} bg-[#fff0db] p-6 rounded-[50px] mb-12 shadow-lg`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {categoriesData &&
            categoriesData.map((item) => {
              const handleSubmit = (item) => {
                navigate(`/products?category=${item.title}`);
              };
              return (
                <div
                  key={item.id}
                  onClick={() => handleSubmit(item)}
                  className="relative w-full h-[120px] flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg hover:bg-[#ff7f29] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-gray-100 group"
                >
                  <h5 className="text-[18px] font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h5>
                  <img
                    src={item.image_Url}
                    alt={item.title}
                    className="w-[100px] h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
