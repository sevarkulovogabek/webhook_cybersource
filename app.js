const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки JSON запросов
app.use(bodyParser.json());

// Ваш секретный ключ (замените на ваш ключ)
const SECRET_KEY = "8ZeiJORgIZK3uI29m16W4JP/WTlV4MCFrchdMcFzrFc=";

// Функция проверки подписи
function isValidSignature(req) {
  const signature = req.headers["cybersource-signature"]; // Заголовок подписи CyberSource
  const payload = JSON.stringify(req.body);
  const calculatedSignature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("hex");

  return signature === calculatedSignature;
}

// Endpoint для healthCheckUrl
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Endpoint для webhookUrl
app.post("/webhook", (req, res) => {
  console.log("Webhook received:");
  console.log(JSON.stringify(req.body, null, 2));

  // Проверка подписи
  if (!isValidSignature(req)) {
    console.error("Invalid Signature");
    return res.status(401).send("Unauthorized");
  }

  // Обработка уведомления
  console.log("Valid Webhook Event");
  res.status(200).send("Webhook processed successfully");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
