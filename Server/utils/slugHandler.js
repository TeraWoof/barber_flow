const getBarberIdBySlug = async (slug, res) => {
  const { data: barber, error: bError } = await supabase
    .from("barbershops")
    .select("id")
    .eq("slug", slug)
    .single();

  if (bError || !barber) {
    return res.status(404).json({ erro: "Barbearia não encontrada" });
  }
  return barber.id;
};
