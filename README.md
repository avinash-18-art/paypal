💳 PayPal Payment Integration (INR Support via USD Conversion)
This project demonstrates integrating PayPal Payment Gateway using Node.js (Express) as the backend and a React.js frontend, allowing users to pay ₹1.00 INR. Since PayPal primarily supports USD, INR is converted to USD in the backend before creating the payment.

📦 Technologies Used
Backend: Node.js, Express, Axios

Frontend: React.js (basic single-page interface)

Payment Gateway: PayPal REST API (Sandbox)

🌐 Prerequisites
Node.js & npm installed

PayPal Developer Account

Sandbox Business & Personal accounts

Get your credentials:

Client ID

Client Secret

🔐 PayPal Currency Note
PayPal does not support INR for processing. You must convert INR to USD or any supported currency manually or via an exchange rate API.

In this example:

₹1.00 INR ≈ $0.012 USD (approx.)

You may fetch real-time exchange rates using services like exchangerate-api.com (optional) 

git clone https://github.com/avinash-18-art/paypal.git
cd paypal-integration-inr