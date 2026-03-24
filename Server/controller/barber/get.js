const express = require("express");
const router = express.Router();
const supabase = require("../../utils/supabase");

// Esta rota será acessível via /api/barber/:id
router.post("/:Barberid", async (req, res) => {
  const { Barberid } = req.params;
  const data = req.body;
  const { data: day } = data;
  console.log("Data recebida:", day);

  // 1. Descobrir o dia da semana (0-6) para a data enviada
  const diaSemana = new Date(day).getDay();

  // 2. Buscar o horário de funcionamento do barbeiro para esse dia
  const { data: config } = await supabase
    .from("barber_schedule")
    .select("start_time, end_time")
    .eq("barber_id", Barberid)
    .eq("day_of_the_week", diaSemana)
    .single();

  if (!config)
    return res.json({
      mensagem: "Não Trabalha neste dia",
      horarios: [],
    });

  // 3. Gerar array de horários entre inicio e fim (ex: de 1 em 1 hora)
  const horariosPossiveis = gerarIntervalos(
    config.hora_inicio,
    config.hora_fim,
  );

  // 4. Buscar agendamentos já ocupados
  const { data: ocupados } = await supabase
    .from("apointments")
    .select("hour")
    .eq("barber_id", Barberid)
    .eq("date", day);

  const horasOcupadas = ocupados.map((o) => o.hour);

  // 5. Filtrar o horário disponível, removendo os ocupados do total de horários possíveis para aquele dia
  const disponiveis = horariosPossiveis.filter(
    (h) => !horasOcupadas.includes(h),
  );

  // Retorna todos os horários possíveis e os ocupados para a agenda do barbeiro naquele dia
  res.status(200).json({ disponiveis, horasOcupadas });
});

// Função auxiliar para criar a lista de horas (ex: 09:00, 10:00...)
function gerarIntervalos(inicio, fim) {
  let slots = [];
  let atual = parseInt(inicio.split(":")[0]);
  let ate = parseInt(fim.split(":")[0]);

  for (let h = atual; h < ate; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
  }
  return slots;
}

module.exports = router;
