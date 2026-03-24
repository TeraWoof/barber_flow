const express = require("express");
const router = express.Router();
const supabase = require("../../utils/supabase");

// Esta rota será acessível via /api/barber/:id
router.post("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Barbeiro ${id} criado`);
});

// Appointments
router.post("/appointments/:Barberid", async (req, res) => {
  const { Barberid } = req.params;
  const { data: day } = req.body;

  const { data: config, error: dbError } = await supabase
    .from("appointments")
    .select(
      `
      client_name, 
      client_contact, 
      hour, 
      date, 
      status,
      services:service_id( 
        service_name, 
        price
      )
    `,
    ) // 2. Mudámos para service_id para forçar a relação
    .eq("barber_id", Barberid)
    .eq("date", day);

  // Se houver erro de sintaxe (coluna errada), ele vai aparecer aqui no terminal
  if (dbError) {
    console.error("ERRO REAL DO SUPABASE:", dbError);
    return res.status(500).json({ error: dbError.message });
  }

  if (!config || config.length === 0) {
    return res.status(404).json({
      error: "Nenhum agendamento encontrado.",
      debug: { Barberid, day },
    });
  }

  res.status(200).json({ appointments: config });
});

module.exports = router;
