import jwt from "jsonwebtoken";

export const requestOTP = async (phone) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phone,
  });

  if (error) {
    console.error("Erro ao enviar OTP:", error);
    throw new Error("Erro ao enviar OTP");
  }
  console.log("OTP enviado com sucesso:", data); // Para fins de desenvolvimento, você pode retornar o OTP aqui
  return data;
};

export const verifyOTP = async (phone, token) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: "sms",
  });
  if (error) {
    console.error("Erro ao verificar OTP:", error);
    throw new Error("Erro ao verificar OTP");
  }
  console.log("OTP verificado com sucesso!");

  //Generate JWT token
  const token = generateToken(data.user.id);
  return token;
};

const generateToken = (userId) => {
  // Generate code JWT with user ID and secret key, set expiration time to 30 days
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
