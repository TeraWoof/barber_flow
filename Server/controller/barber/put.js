const express = require("express");
const router = express.Router();

// Esta rota será acessível via /api/barber/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Barbeiro ${id} atualizado com sucesso!`);
});

module.exports = router;
