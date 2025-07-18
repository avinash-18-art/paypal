const express = require("express");
const paypal = require("paypal-rest-sdk");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

paypal.configure({
  mode: "sandbox", 
  client_id: "AQxrq7rhVkDuwihrSE_bcpevfBPVST3iVeyGHZrNb9TOHI2_fE0msNR9A0CTpMqyBSvxUJEJtxkrIBZU", // 🔁 Replace with your client_id
  client_secret: "ENuLqdxHNVbyXMYQUhXYmCQ4wquXSm2gDovMgl2qYt3tHcRxMOgojI92vCB5wweHkPgtXuWUoXaYWJgf" // 🔁 Replace with your client_secret
});

app.post("/payment", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:8000/success",
      cancel_url: "http://localhost:8000/failed"
    },
    transactions: [{
      item_list: {
        items: [{
          name: "Sample Product",
          sku: "001",
          price: "1.00",
          currency: "USD",
          quantity: 1
        }]
      },
      amount: {
        currency: "USD",
        total: "1.00"
      },
      description: "Sample payment using PayPal."
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error("❌ Error creating PayPal payment:", error.response);
      return res.status(500).json({ error: "Payment creation failed." });
    } else {
      console.log("✅ Payment created successfully!");
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
      if (approvalUrl) {
        return res.status(200).json({ approval_url: approvalUrl.href });
      } else {
        return res.status(500).json({ error: "Approval URL not found." });
      }
    }
  });
});

app.get("/success", (req, res) => {
  res.send("✅ Payment Success! Thank you.");
});

app.get("/failed", (req, res) => {
  res.send("❌ Payment Failed or Canceled.");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
