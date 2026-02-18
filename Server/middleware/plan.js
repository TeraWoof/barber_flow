const checkPlan = (requiredPlan) => {
  return async (req, res, next) => {
    const { barber_id } = req.body; // Ou via auth/token

    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("plan_type, status")
      .eq("barber_id", barber_id)
      .single();

    if (error || !subscription) {
      return res.status(403).json({ erro: "Subscrição não encontrada." });
    }

    if (
      subscription.status !== "active" &&
      subscription.status !== "trialing"
    ) {
      return res.status(403).json({ erro: "A sua subscrição não está ativa." });
    }

    // Lógica de hierarquia: se o plano for PRO, ele tem acesso ao que o BASE tem.
    const plans = { base: 1, pro: 2 };

    if (plans[subscription.plan_type] < plans[requiredPlan]) {
      return res.status(402).json({
        erro: "Funcionalidade exclusiva do Plano PRO",
        upgrade_needed: true,
      });
    }

    next();
  };
};

module.exports = checkPlan;
