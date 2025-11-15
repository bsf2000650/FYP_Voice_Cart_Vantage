import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import useSpeechToText from "../../hooks/useSpeechToText/useSpeechToText";
import ProductName from "./CreateProductComponents/ProductName";
import Description from "../../components/Shop/CreateProductComponents/Description";
import Tag from "../../components/Shop/CreateProductComponents/Tag";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    setDescription(
      (prevVal) =>
        prevVal +
        (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
    );
    stopListening();
  };

  useEffect(() => {
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
    }
  }, [success, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2)
          setImages((old) => [...old, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const blockInvalidKeys = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !category || !discountPrice || !stock) {
      toast.error("Please fill all required fields!");
      return;
    }
    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
  };

  return (
    <div className="w-[92%] mx-auto my-5 p-2 sm:p-6 bg-gradient-to-r from-[#fff0db] to-[#fff7e6] shadow-xl rounded-[20px] border border-[#ffd1a3] pb-20 md:pb-5">
      <h2 className="text-3xl font-bold text-center text-[#ff7e29] mb-6">
        Create Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div className="relative">
          <label className="block mb-2 font-semibold text-[#ff7e29]">
            Name <span className="text-red-500">*</span>
          </label>
          <ProductName
            productName={name}
            setProductName={setName}
            className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="relative">
          <label className="block mb-2 font-semibold text-[#ff7e29]">
            Description <span className="text-red-500">*</span>
          </label>
          <Description
            description={description}
            setDescription={setDescription}
            className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-[#ff7e29]">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none text-gray-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled selected className="text-gray-400">
              Choose a category
            </option>
            {categoriesData.map((i) => (
              <option value={i.title} key={i.title} className="text-black">
                {i.title}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 font-semibold text-[#ff7e29]">
            Tags
          </label>
          <Tag tag={tags} setTag={setTags} className="w-full" />
        </div>

        {/* Pricing & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-semibold text-[#ff7e29]">
              Original Price
            </label>
            <input
              type="number"
              value={originalPrice}
              min={0}
              max={100000}
              onKeyDown={blockInvalidKeys}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
              placeholder="Enter original price"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-[#ff7e29]">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={discountPrice}
              min={0}
              max={100000}
              onKeyDown={blockInvalidKeys}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
              placeholder="Enter discount price"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-[#ff7e29]">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={stock}
              min={0}
              max={100000}
              onKeyDown={blockInvalidKeys}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
              placeholder="Enter stock"
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block mb-2 font-semibold text-[#ff7e29]">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap items-center gap-3 border border-dashed border-gray-300 rounded-[15px] p-3">
            <label
              htmlFor="upload"
              className="cursor-pointer text-[#ff7e29] flex items-center justify-center w-[50px] h-[50px] border-2 border-[#ff7e29] rounded-full hover:bg-[#ff7e29] hover:text-white transition-all"
            >
              <AiOutlinePlusCircle size={28} />
            </label>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`preview-${idx}`}
                className="h-[100px] w-[100px] object-cover rounded-[10px] shadow-md"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#ff7e29] text-white rounded-[50px] font-semibold text-lg shadow-md hover:bg-[#e56f1f] transition-all"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
