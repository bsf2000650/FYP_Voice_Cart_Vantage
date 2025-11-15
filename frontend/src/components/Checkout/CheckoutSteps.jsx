import React from "react";
import styles from "../../styles/styles";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ active }) => {
  console.log(active);
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] 800px:w-[50%] flex flex-col sm:flex-row items-center justify-center flex-wrap checkoutDiv sm:gap-0 gap-4 text-center mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto steps">
          <div
            className={`${styles.cart_button} steps w-full sm:w-auto text-center`}
          >
            <span className={`${styles.cart_button_text}`}>1. Shipping</span>
          </div>
          {/* Line (hidden on mobile) */}
          <div
            className={`hidden sm:block ${
              active > 1
                ? "w-[70px] h-[4px] bg-[#ff7f29] checkout"
                : "w-[70px] h-[4px] bg-[#FDE1E6] checkout"
            }`}
          />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto steps paymentDiv">
          <div
            className={`${
              active > 1
                ? `${styles.cart_button} steps w-full sm:w-auto text-center`
                : `${styles.cart_button} !bg-[#FDE1E6] w-full sm:w-auto text-center`
            }`}
          >
            <span
              className={`${
                active > 1
                  ? `${styles.cart_button_text} steps`
                  : `${styles.cart_button_text} !text-[#ff7f29]`
              }`}
            >
              2. Payment
            </span>
          </div>
          {/* Line (hidden on mobile) */}
          <div
            className={`hidden sm:block ${
              active > 3
                ? "w-[70px] h-[4px] bg-[#ff7f29] checkout steps"
                : "w-[70px] h-[4px] bg-[#FDE1E6] checkout"
            }`}
          />
        </div>

        {/* Step 3 */}
        <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto steps">
          <div
            className={`${
              active > 2
                ? `${styles.cart_button} steps w-full sm:w-auto text-center`
                : `${styles.cart_button} !bg-[#FDE1E6] steps w-full sm:w-auto text-center`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#ff7f29]`
              }`}
            >
              3. Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
