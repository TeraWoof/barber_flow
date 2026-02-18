const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "Muitos pedidos vindos deste IP, tente novamente mais tarde.",
});

module.exports = apiLimiter;
