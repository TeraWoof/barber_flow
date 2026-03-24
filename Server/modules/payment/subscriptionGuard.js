export const checkSubscription = async (req, res, next) => {
  const { barberId } = req.user;

  // Quick check in Supabase if the barber's subscription is active
  const { data: barber } = await supabase
    .from("barbers")
    .select("status")
    .eq("id", barberId)
    .single();

  if (barber?.status !== "active") {
    return res.status(403).json({
      error: "Assinatura expirada. Pague para continuar a cortar cabelo!",
    });
  }
  next();
};
