const express = require("express");
const router = express.Router();
const paymentController = require("../plan/payment");
const authenticateBarber = require("../middleware/auth");

// Rota para iniciar o pagamento (Protegida)
router.post("/checkout", authenticateBarber, paymentController.createCheckout);

// Rota para o Webhook (Deve ser pública e usar express.raw() no index.js)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook,
);

module.exports = router;
