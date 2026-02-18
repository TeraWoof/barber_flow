const express = require("express");
const router = express.Router();
const moment = require("moment");
const supabase = require("../utils/supabase");

// Mudamos o parâmetro de :Barberid para :slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const { data, service_id } = req.query;

    // 1. "TRADUÇÃO": Buscar o ID do barbeiro através do Slug
    const barber = await getBarberIdBySlug(slug, res);

    const BarberIdReal = barber.id;

    // 2. Buscar a duração do serviço + buffer
    const { data: service, error: sError } = await supabase
      .from("services")
      .select("duration_minutes, buffer_minutes")
      .eq("id", service_id)
      .single();

    if (sError || !service)
      return res.status(404).json({ erro: "Serviço não encontrado" });

    const tempoTotalNecessario =
      service.duration_minutes + service.buffer_minutes;

    // 3. Buscar horário de funcionamento usando o ID real
    const diaSemana = new Date(data).getDay();
    const { data: config } = await supabase
      .from("barber_schedule")
      .select("start_time, end_time")
      .eq("barber_id", BarberIdReal) // Uso do ID interno
      .eq("day_of_the_week", diaSemana)
      .single();

    if (!config) return res.json({ mensagem: "Fechado", disponiveis: [] });

    // 4. Buscar agendamentos já ocupados usando o ID real
    const { data: ocupados } = await supabase
      .from("appointments")
      .select("start_time, end_time")
      .eq("barber_id", BarberIdReal) // Uso do ID interno
      .eq("date", data);

    // 5. Gerar horários com a lógica da "Opção A"
    const disponiveis = gerarIntervalosInteligentes(
      config.start_time,
      config.end_time,
      tempoTotalNecessario,
      ocupados || [],
    );

    res.json({
      barber_id: BarberIdReal, // Retornamos o ID para o front usar no POST final
      disponiveis,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

// A função auxiliar permanece igual, pois ela só lida com lógica de tempo
function gerarIntervalosInteligentes(inicio, fim, duracaoTotal, ocupados) {
  let slots = [];
  let atual = moment(inicio, "HH:mm");
  const ate = moment(fim, "HH:mm");

  const step = duracaoTotal >= 60 ? 60 : 30;

  if (atual.minutes() !== 0 && atual.minutes() !== 30) {
    atual.add(30 - (atual.minutes() % 30), "minutes");
  }

  while (atual.clone().add(duracaoTotal, "minutes").isSameOrBefore(ate)) {
    const slotInicio = atual.format("HH:mm");
    const slotFim = atual.clone().add(duracaoTotal, "minutes").format("HH:mm");

    const isOcupado = ocupados.some((ag) => {
      return slotInicio < ag.end_time && slotFim > ag.start_time;
    });

    if (!isOcupado) {
      slots.push(slotInicio);
    }

    atual.add(step, "minutes");
  }

  return slots;
}

module.exports = router;
