const express = require("express");
const router = express.Router();
const supabase = require("../utils/supabase");

// Esta rota será acessível via /api/barber/:slug
router.put("/:slug", (req, res) => {
  const { slug } = req.params;
  res.send(`Barbeiro ${slug} atualizado`);
});

module.exports = router;
