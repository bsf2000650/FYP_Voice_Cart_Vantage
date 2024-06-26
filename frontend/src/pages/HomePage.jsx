import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import './ChatBot.css'
import Chatbot from './ChatBot';

const HomePage = () => {

  return (
    <div>
        <Header activeHeading={1} />
        <Link to="/note">
            <button>Note: To view the products, follow the given procedure by clicking the given link.</button>
        </Link>
        <Hero />
        <Categories />
        <BestDeals />
        <Events />
        <FeaturedProduct />
        <Sponsored />
        <Footer /> 
        <Chatbot />  
    </div>
  )
}

export default HomePage