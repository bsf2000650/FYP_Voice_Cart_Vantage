import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} py-10`}>
      <div className="w-full flex justify-between gap-8">
        {/* LEFT — Shop Info */}
        <div className="w-[30%] rounded-[10px] shadow-sm h-fit">
          <ShopInfo isOwner={true} />
        </div>

        {/* RIGHT — Shop Profile Data */}
        <div className="w-[70%] bg-[#fff0db] rounded-[10px] shadow-sm">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
