exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name }, // Guarda metadados úteis
    },
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: "Verifica o teu email!", user: data.user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: "Credenciais inválidas" });

  // O 'session' contém o token que a app vai usar
  res.json({ session: data.session, user: data.user });
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "barberflow://reset-password", // O barbeiro clica no email e volta para a app
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Link de recuperação enviado!" });
};
