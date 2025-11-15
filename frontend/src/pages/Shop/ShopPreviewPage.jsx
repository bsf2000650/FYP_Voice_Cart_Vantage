import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import Header from "../../components/Layout/Header";

const ShopPreviewPage = () => {
  return (
    <div>
      <Header />
      <div
        className={`${styles.section} bg-[#f5f5f5] mt-2 mb-2 rounded-[25px]`}
      >
        <div className="w-full flex flex-col 800px:flex-row py-10 justify-between gap-6">
          {/* Left Sidebar */}
          <div className="w-[95%] 800px:w-[25%] ml-2 rounded-[4px] shadow-sm 800px:overflow-y-auto 800px:h-[90vh] 800px:sticky 800px:top-10 800px:left-0 relative z-auto">
            <ShopInfo isOwner={false} />
          </div>
          {/* Right Content */}
          <div className="w-full 800px:w-[72%] mt-5 800px:mt-0 rounded-[4px]">
            <ShopProfileData isOwner={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
