const express = require("express");
const router = express.Router();
const supabase = require("../utils/supabase");

// Esta rota será acessível via /api/barber/:slug
router.post("/:slug", async (req, res) => {
  const { slug } = req.params;
  const barber = await getBarberIdBySlug(slug, res);
  res.send(`Barbeiro ${barber.id} criado`);
});

module.exports = router;
