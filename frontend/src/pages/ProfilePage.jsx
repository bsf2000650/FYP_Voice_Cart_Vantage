import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import ProfileMobNavbar from "../components/Profile/ProfileMobNavbar"; // <--- new import
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  // Optional: define logout handler for mobile navbar
  const logoutHandler = () => {
    // You can reuse the same logic from ProfileSidebar
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] pb-16">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />

          {/* Profile Section */}
          <div
            className={`${styles.section} flex flex-col 800px:flex-row justify-center items-start gap-8 py-10`}
          >
            {/* Sidebar (25%) */}
            <div className="hidden 800px:block w-full 800px:w-[25%] shadow-lg rounded-2xl overflow-hidden sticky top-[100px] transition-transform transform hover:scale-[1.02] duration-300">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>

            {/* Main Content (75%) */}
            <div className="w-full 800px:w-[75%] shadow-lg rounded-2xl  min-h-[500px] transition-transform transform hover:scale-[1.01] duration-300 bg-[#fff0db]">
              <ProfileContent active={active} />
            </div>
          </div>

          {/* Mobile Navbar */}
          <ProfileMobNavbar
            active={active}
            setActive={setActive}
            logoutHandler={logoutHandler}
          />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
