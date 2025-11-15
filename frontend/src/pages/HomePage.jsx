import Header from "../components/Layout/Header";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Footer from "../components/Layout/Footer";
import "./ChatBot.css";
import Chatbot from "./ChatBot";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default HomePage;
