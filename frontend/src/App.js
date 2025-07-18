import React from "react";
import axios from 'axios';

import "./App.css";

function App() {
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/payment");
      console.log("PayPal Payment Response:", res.data);
      if (res.data && res.data.approval_url) {
        window.location.href = res.data.approval_url;
      } else {
        alert("Payment initiation failed.");
      }
    } catch (error) {
      console.error("❌ Error initiating payment:", error);
      alert("Error initiating payment.");
    }
  };

  return (
    <div className="paypal-container">
      <div className="paypal-card">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="paypal-logo"
        />
        <h1>Buy Now with PayPal</h1>
        <p>Click below to pay <strong>₹1.00</strong> using PayPal Sandbox</p>
        <button className="paypal-button" onClick={HandleSubmit}>
          <span>💳 Pay ₹1.00</span>
        </button>
      </div>
    </div>
  );
}

export default App;
