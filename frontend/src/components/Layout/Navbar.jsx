import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import { FiHome, FiShoppingBag, FiUser, FiInfo, FiPhone } from "react-icons/fi";
import { FaStore } from "react-icons/fa";

const icons = [FiHome, FiShoppingBag, FiUser, FiInfo, FiPhone, FaStore];

const Navbar = ({ active }) => {
  return (
    <div className="bg-[#ff7e29] rounded-[50px] flex flex-wrap justify-center items-center sm:gap-8 800px:flex-row flex-col w-[94%] m-2.5 gap-1">
      {navItems &&
        navItems.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Link
              key={index}
              to={item.url}
              className={`relative group transition-all duration-300 ${
                active === index + 1
                  ? "text-white font-semibold"
                  : "text-white 800px:text-white"
              } font-madimi text-[16px] px-4 py-2 rounded-md flex items-center justify-center`}
            >
              {/* Text */}
              <span className="group-hover:opacity-0 transition-opacity duration-300">
                {item.title}
              </span>

              {/* Icon on hover */}
              <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon size={20} />
              </span>

              {/* Underline */}
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300
                  ${
                    active === index + 1 ? "w-full" : "group-hover:w-full w-0"
                  }`}
              ></span>
            </Link>
          );
        })}
    </div>
  );
};

export default Navbar;
