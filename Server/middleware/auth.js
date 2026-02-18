const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Formato "Bearer TOKEN"

    // O JWT_SECRET está no teu ficheiro .env (vem do Supabase)
    jwt.verify(token, process.env.SUPABASE_JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ erro: "Sessão inválida ou expirada" });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ erro: "Token não fornecido" });
  }
};

module.exports = authenticateJWT;
