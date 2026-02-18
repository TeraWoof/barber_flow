import { subscriptionSchema } from "../schema/subscription";

// No teu Controller/Route
export const updateSubscription = async (req, res) => {
  const validation = subscriptionSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: validation.error.format(),
    });
  }

  // Se chegou aqui, os dados são 100% seguros para a BD
  const cleanData = validation.data;
  
  if (cleanData.plan_type === "base") {
    cleanData.whatsapp_enabled = false; // Override de segurança
  }
};
