require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const apiLimiter = require("./utils/limiter");
const authenticateBarber = require("./middleware/auth");

const app = express();

// Security e Parsing
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Barber Import Routes
const barberGet = require("./barber/get");
const barberPost = require("./barber/post");
const barberPut = require("./barber/put");

// Client Import Routes
const clientGet = require("./client/get");
const clientPost = require("./client/post");
const clientPut = require("./client/put");

// Apply Routes Limiting
app.use("/api/client", apiLimiter);

// MObile Baber Routes
app.use("/api/barber", authenticateBarber, barberGet);
app.use("/api/barber", authenticateBarber, barberPost);
app.use("/api/barber", authenticateBarber, barberPut);

// Web Client Routes
app.use("/api/client", clientGet);
app.use("/api/client", clientPost);
app.use("/api/client", clientPut);

// Error Handling
app.use((req, res) => res.status(404).json({ error: "Não encontrado" }));

// Start Server
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo correu mal no servidor!" });
});
app.listen(PORT, () => {
  console.log(`Server a correr na porta ${PORT}`);
});
