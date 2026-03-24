import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentModule = {
  // Create checkout session for subscription
  async createSubscription(barberId, planId) {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: planId, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { barberId }, // Pass barber ID to metadata for later use in webhook
    });
    return session.url;
  },

  // Webhook processing
  async processWebhook(event) {
    const session = event.data.object;
    if (event.type === "checkout.session.completed") {
      const barberId = session.metadata.barberId;
      const stripeCustomerId = session.customer;

      // UPDATE barbers SET status = 'active', WHERE id = barberId AND stripe_id = stripeCustomerId
      supabase
        .from("barbers")
        .update({ status: "active", stripe_id: stripeCustomerId })
        .eq("id", barberId)
        .then(() => {
          console.log(`Barber ${barberId} subscription activated!`);
          return { success: true };
        })
        .catch((err) => {
          console.error("Error updating barber subscription:", err);
          return {
            success: false,
            error: "Failed to update subscription status",
          };
        });
    } else if (event.type === "customer.subscription.deleted") {
      const stripeCustomerId = event.data.object.customer;
      // UPDATE barbers SET status = 'inactive' WHERE stripe_id = stripeCustomerId
      supabase
        .from("barbers")
        .update({ status: "inactive" })
        .eq("stripe_id", stripeCustomerId)
        .then(() => {
          console.log(
            `Subscription for customer ${stripeCustomerId} cancelled!`,
          );
          return { success: true };
        })
        .catch((err) => {
          console.error("Error updating barber subscription:", err);
          return {
            success: false,
            error: "Failed to update subscription status",
          };
        });
    }
  },
};
