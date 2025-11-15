import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";
import Name from "../../components/Shop/CreateEventVoiceComps/Name";
import Description from "../../components/Shop/CreateEventVoiceComps/Description";
import Tag from "../../components/Shop/CreateEventVoiceComps/Tag";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  const handleStartDateChange = (e) => {
    const start = new Date(e.target.value);
    const minEnd = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(start);
    setEndDate(null);
    document.getElementById("end-date").min = minEnd.toISOString().slice(0, 10);
  };

  const handleEndDateChange = (e) => setEndDate(new Date(e.target.value));

  useEffect(() => {
    if (success) {
      toast.success("Event created successfully!");
      // Clear all fields
      setName("");
      setDescription("");
      setCategory("");
      setTags("");
      setOriginalPrice("");
      setDiscountPrice("");
      setStock("");
      setImages([]);
      setStartDate(null);
      setEndDate(null);
      navigate("/dashboard-events");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !category ||
      !discountPrice ||
      !stock ||
      !startDate ||
      !endDate
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    const data = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
      shopId: seller._id,
      start_Date: startDate.toISOString(),
      Finish_Date: endDate.toISOString(),
    };

    dispatch(createevent(data));
  };

  return (
    <div className="w-[92%] mx-auto my-5 p-2 sm:p-6 bg-gradient-to-r from-[#fff0db] to-[#fff7e6] shadow-xl rounded-[20px] border border-[#ffd1a3] pb-20 md:pb-5 overflow-y-auto">
      <h2 className="text-3xl font-bold text-center text-[#ff7e29] mb-6">
        Create Event
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold text-[#ff7e29]">
            Name <span className="text-red-500">*</span>
          </label>
          <Name
            name={name}
            setName={setName}
            className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
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
            <option value="" disabled className="text-gray-400">
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
          <Tag tags={tags} setTags={setTags} className="w-full" />
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
              onChange={(e) => setOriginalPrice(e.target.value)}
              min={0}
              max={100000}
              step={1}
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
              onChange={(e) => setDiscountPrice(e.target.value)}
              min={0}
              max={100000}
              step={1}
              className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
              placeholder="Enter discounted price"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#ff7e29]">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min={0}
              max={100000}
              step={1}
              className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
              placeholder="Enter stock"
            />
          </div>
        </div>

        {/* Event Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold text-[#ff7e29]">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              onChange={handleStartDateChange}
              min={today}
              className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#ff7e29]">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              onChange={handleEndDateChange}
              min={minEndDate}
              id="end-date"
              className="w-full border border-gray-300 rounded-[50px] px-6 py-3 shadow-sm focus:ring-2 focus:ring-[#ff7e29] focus:outline-none"
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
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
