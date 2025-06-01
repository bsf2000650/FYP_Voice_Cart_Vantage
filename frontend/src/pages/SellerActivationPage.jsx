import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../server";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState(""); // Only needed if you want to resend
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/seller/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.response.data.message);
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  const handleResend = async () => {
    try {
      // Ideally you'd store the values in localStorage or context
      const userData = JSON.parse(localStorage.getItem("pendingSeller"));
      if (!userData) return alert("Seller data not found.");

      await axios.post(`${server}/seller/resend-activation`, userData);
      alert("Activation email resent! Please check your inbox.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend activation.");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <>
          <p>Your token is expired!</p>
          <button
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              cursor: "pointer",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
            }}
            onClick={handleResend}
          >
            Resend Activation Email
          </button>
        </>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default SellerActivationPage;
