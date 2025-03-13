const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки JSON запросов
app.use(bodyParser.json());


// Endpoint для healthCheckUrl
app.get("/health", (req, res) => {
  console.log("Request health");
  res.status(200).send("OK");
});

// Endpoint для webhookUrl
app.post("/webhook", (req, res) => {
  console.log("Request webhook (POST)");
  console.log("Webhook received:");
  console.log(req.body);
  res.status(200).send("Webhook processed successfully");
});

app.get("/", (req, res) => {
  console.log("Request (GET)");
  console.log(req.body);
  res.status(200).send("Webhook processed successfully");
});
app.post("/", (req, res) => {
  console.log("Request (GET)");
  console.log(req.body);
  res.status(200).send("Webhook processed successfully");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
