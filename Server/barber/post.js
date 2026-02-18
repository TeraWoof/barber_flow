const express = require("express");
const router = express.Router();

// Esta rota será acessível via /api/barber/:id
router.post("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Barbeiro ${id} criado`);
});

module.exports = router;
