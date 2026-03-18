const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createSubscription = async (req, res) => {
  const { email, priceId, barberId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card", "mb_way", "customer_balance"],
      payment_method_options: {
        customer_balance: {
          funding_type: "bank_transfer",
          bank_transfer: { type: "eu_bank_transfer" },
        },
      },
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      // ESTA É A CHAVE:
      subscription_data: {
        billing_cycle_anchor: Math.floor(Date.now() / 1000), // Começa agora
      },
      payment_intent_data: {
        setup_future_usage: "off_session", // Tenta preparar para cobranças futuras
      },
      success_url: `barberflow://payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `barberflow://payment-failed`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rota para receber os avisos do Stripe
exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verifica se o aviso veio mesmo do Stripe por segurança
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Lógica para cada tipo de evento
  switch (event.type) {
    case "invoice.paid":
      const invoice = event.data.object;
      const customerId = invoice.customer;
      const subscriptionId = invoice.subscription;

      // Aqui atualizas a tua Base de Dados
      // Ex: const barber = await Barber.findOne({ stripeCustomerId: customerId });
      // barber.planStatus = 'active';
      // await barber.save();

      console.log(`Pagamento recebido para o cliente: ${customerId}`);
      break;

    case "invoice.payment_failed":
      // O pagamento falhou (cartão sem saldo ou MB WAY ignorado)
      // Aqui podes enviar um aviso ao barbeiro: "Pagamento pendente"
      console.log("Pagamento falhou ou expirou.");
      break;

    default:
      console.log(`Evento não tratado: ${event.type}`);
  }

  res.json({ received: true });
};
