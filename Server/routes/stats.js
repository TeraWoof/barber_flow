router.get("/me/stats", authenticateJWT, async (req, res) => {
  // O ID do barbeiro vem do token, não do URL (mais seguro)
  const barberId = req.user.sub;

  const { data, error } = await supabase
    .from("appointments")
    .select("price")
    .eq("barber_id", barberId)
    .eq("status", "concluded");
});
